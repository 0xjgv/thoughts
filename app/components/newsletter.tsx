'use client'

import { useEffect, useRef, useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const visitorId = useRef<string>('')

  useEffect(() => {
    import('@fingerprintjs/fingerprintjs').then((FingerprintJS) =>
      FingerprintJS.load().then((fp) =>
        fp.get().then((result) => {
          visitorId.current = result.visitorId
        })
      )
    )
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    if (form.querySelector<HTMLInputElement>('[name="url"]')?.value) return

    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, visitorId: visitorId.current }),
      })

      if (response.ok || response.status === 409) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="w-full py-6 px-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Thanks for subscribing! You&apos;re on the list.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full py-6 px-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Get notified when I publish new thoughts—no spam, just signal.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          type="text"
          name="url"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <input
          type="email"
          name="email"
          id="newsletter-email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="flex-1 px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 text-sm font-medium text-white bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-900 rounded-md hover:bg-neutral-700 dark:hover:bg-neutral-300 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  )
}
