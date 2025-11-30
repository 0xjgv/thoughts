import fs from 'fs'
import path from 'path'

type ProjectMetadata = {
  title: string
  description: string
  tags: string[]
  url?: string
  github?: string
  featured?: boolean
  order?: number
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  let frontMatterBlock = match![1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let rawMetadata: { [key: string]: string } = {}

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(': ')
    if (key) {
      let value = valueArr.join(': ').trim()
      value = value.replace(/^['"](.*)['"]$/, '$1')
      rawMetadata[key.trim()] = value
    }
  })

  let metadata: Partial<ProjectMetadata> = {
    title: rawMetadata.title,
    description: rawMetadata.description,
    url: rawMetadata.url,
    github: rawMetadata.github,
    featured: rawMetadata.featured === 'true',
    order: rawMetadata.order ? parseInt(rawMetadata.order) : undefined,
    tags:
      rawMetadata.tags && typeof rawMetadata.tags === 'string'
        ? rawMetadata.tags.split(',').map((tag) => tag.trim())
        : []
  }

  Object.keys(metadata).forEach(
    (key) => metadata[key] === undefined && delete metadata[key]
  )

  return { metadata: metadata as ProjectMetadata, content }
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content
    }
  })
}

export function getProjects() {
  return getMDXData(path.join(process.cwd(), 'app', 'projects', 'posts'))
}
