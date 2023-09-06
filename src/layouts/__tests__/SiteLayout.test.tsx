import * as React from 'react'

import { SiteLayout } from '../SiteLayout'
import { render, waitFor, screen } from '@testing-library/react'

// @ts-expect-error incomplete type definition
global.IntersectionObserver = class FakeIntersectionObserver {
  observe() {}
  disconnect() {}
}

describe('SiteLayout', () => {
  test('renders the layout with children', async () => {
    const DummyComponent = () => <div>Lego or K’Nex</div>
    render(
      <SiteLayout>
        <DummyComponent />
      </SiteLayout>,
    )

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()
    })

    expect(screen.getByText(/Lego/i)).toBeInTheDocument()
  })

  test('renders the categories list when requested', async () => {
    const DummyComponent = () => <div>Lego or K’Nex</div>
    render(
      <SiteLayout showCategoriesList>
        <DummyComponent />
      </SiteLayout>,
    )

    const closeButton = screen.getByRole('button', { name: /Close sidebar/i })
    expect(closeButton).toBeDefined()
    expect(closeButton).toBeVisible()
  })
})
