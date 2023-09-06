import * as React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export function PageContent({ content }: { content: string }) {
  return (
    <section><ReactMarkdown>{content}</ReactMarkdown></section>
  )
}
