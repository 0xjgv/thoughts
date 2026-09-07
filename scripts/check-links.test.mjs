import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { test } from 'node:test'
import { checkLink, extractLinks } from './check-links.mjs'

test('finds literal visitor URLs, deduplicates, and skips namespaces and dynamic shares', () => {
  const source = [
    'href="https://example.com/resume.pdf"',
    "github: 'https://github.com/user/repo'",
    "const baseUrl = 'https://example.com'",
    "sameAs: ['https://social.example/me']",
    '[project](https://project.example/path#readme)',
    'href="https://project.example/path"',
    "'@context': 'https://schema.org'",
    'xmlns="http://www.w3.org/2000/svg"',
    '`https://twitter.com/intent/tweet?text=${title}`',
    '`https://example.com/posts/${slug}`',
  ].join('\n')
  assert.deepEqual(extractLinks(source), [
    'https://example.com/',
    'https://example.com/resume.pdf',
    'https://github.com/user/repo',
    'https://project.example/path',
    'https://social.example/me',
  ])
})

test('checks live pages, redirects, retries, blocked pages, and timeouts', async (t) => {
  const requests = new Map()
  const server = createServer((request, response) => {
    const path = request.url
    requests.set(path, (requests.get(path) ?? 0) + 1)
    if (path === '/timeout') return
    if (path === '/redirect') {
      response.writeHead(302, { location: '/live' })
    } else {
      const status = path === '/missing' ? 404
        : path === '/gone' ? 410
          : path === '/blocked' ? 403
            : path === '/transient' && requests.get(path) === 1 ? 404
              : 200
      response.writeHead(status)
    }
    response.end()
  })
  await new Promise((done) => server.listen(0, '127.0.0.1', done))
  t.after(() => {
    server.closeAllConnections()
    return new Promise((done) => server.close(done))
  })
  const base = `http://127.0.0.1:${server.address().port}`
  for (const [path, expected] of [
    ['/live', 'ok'], ['/redirect', 'ok'], ['/missing', 'fail'],
    ['/gone', 'fail'], ['/transient', 'ok'], ['/blocked', 'warn'], ['/timeout', 'warn'],
  ]) {
    const result = await checkLink(`${base}${path}`, { timeoutMs: path === '/timeout' ? 30 : 1000, retryDelayMs: 0 })
    assert.equal(result.status, expected, path)
  }
  for (const path of ['/missing', '/gone', '/transient', '/blocked', '/timeout']) {
    assert.equal(requests.get(path), 2, path)
  }
})

test('only repeated definite DNS failures fail; transient DNS and mixed errors warn', async () => {
  for (const [codes, expected] of [
    [['ENOTFOUND', 'ENOTFOUND'], 'fail'],
    [['EAI_NONAME', 'EAI_NONAME'], 'fail'],
    [['EAI_AGAIN', 'EAI_AGAIN'], 'warn'],
    [['ENOTFOUND', 'ECONNRESET'], 'warn'],
  ]) {
    let calls = 0
    const result = await checkLink('https://missing.example', {
      retryDelayMs: 0,
      fetchImpl: async () => {
        throw new TypeError('fetch failed', { cause: Object.assign(new Error(), { code: codes[calls++] }) })
      },
    })
    assert.equal(result.status, expected)
    assert.equal(calls, 2)
  }
})
