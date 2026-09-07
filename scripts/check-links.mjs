import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// Literal URLs cover hrefs, MDX metadata/links, sameAs, and the canonical baseUrl.
// Interpolated URLs need runtime values and are deliberately outside this check.
export function extractLinks(source) {
  const links = new Set()
  for (const match of source.matchAll(/https?:\/\/[^\s"'`<>]+/g)) {
    const raw = match[0].replace(/[),.;\]]+$/, '')
    if (raw.includes('${')) continue
    try {
      const url = new URL(raw)
      if (['schema.org', 'www.w3.org'].includes(url.hostname)) continue
      if (url.pathname === '/intent/tweet' || url.pathname === '/sharing/share-offsite/') continue
      url.hash = ''
      links.add(url.href)
    } catch {
      // Incomplete source expressions are not literal URLs.
    }
  }
  return [...links].sort()
}

export async function discoverLinks(directory) {
  const links = new Set()
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name)
    const found = entry.isDirectory()
      ? await discoverLinks(path)
      : /\.(ts|tsx|mdx)$/.test(entry.name)
        ? extractLinks(await readFile(path, 'utf8'))
        : []
    for (const url of found) links.add(url)
  }
  return [...links].sort()
}

function networkReason(error) {
  for (let cause = error, depth = 0; cause && depth < 8; cause = cause.cause, depth++) {
    if (cause.code === 'ENOTFOUND' || cause.code === 'EAI_NONAME') return 'DNS not found'
  }
  return 'network error or timeout'
}

export async function checkLink(url, { fetchImpl = fetch, timeoutMs = 8000, retryDelayMs = 200 } = {}) {
  const attempts = []
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetchImpl(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(timeoutMs),
        headers: { 'user-agent': 'thoughts-link-checker/1.0' },
      })
      await response.body?.cancel()
      if (response.ok) return { url, status: 'ok', detail: `HTTP ${response.status}` }
      attempts.push(`HTTP ${response.status}`)
    } catch (error) {
      attempts.push(networkReason(error))
    }
    if (attempt === 0) await new Promise((done) => setTimeout(done, retryDelayMs))
  }
  const missing = attempts.every((reason) => reason === 'HTTP 404' || reason === 'HTTP 410')
  const dns = attempts.every((reason) => reason === 'DNS not found')
  return { url, status: missing || dns ? 'fail' : 'warn', detail: attempts.join(', then ') }
}

async function main() {
  const links = await discoverLinks(resolve('app'))
  const results = new Array(links.length)
  let next = 0
  await Promise.all(Array.from({ length: Math.min(4, links.length) }, async () => {
    while (next < links.length) {
      const index = next++
      results[index] = await checkLink(links[index])
    }
  }))
  for (const result of results) {
    console.log(`${result.status.toUpperCase()} ${result.url} — ${result.detail}`)
  }
  const count = (status) => results.filter((result) => result.status === status).length
  console.log(`\n${links.length} links: ${count('ok')} passed, ${count('fail')} failed, ${count('warn')} uncertain.`)
  console.log('Failures require two missing-page or DNS results. Warnings need manual verification.')
  process.exitCode = count('fail') ? 1 : 0
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
