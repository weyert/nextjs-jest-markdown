import * as React from 'react'
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import SiteLayout from '@/layouts/SiteLayout'
import { PageContent } from '@/components/PageContent'

function StartPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <SiteLayout>
      <h1>Start Page ({props.name}</h1>
      <PageContent content={props.content} />
    </SiteLayout>
  )
}

/**
 * @inheritDoc
 */
export function getServerSideProps(_ctx: GetServerSidePropsContext) {
  return {
    props: {
      name: 'Hello World',
      content: `# PageContent\n\nThis is a Markdown paragraph\n\n`,
    },
  }
}

export default StartPage
