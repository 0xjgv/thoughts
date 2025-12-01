'use client'

import { CopyButton } from './copy-button'

export function CodeBlock({ children, code }: { children: React.ReactNode; code: string }) {
  return (
    <div className="relative group">
      {children}
      <CopyButton text={code} />
    </div>
  )
}
