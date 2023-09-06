import { render, screen } from "@testing-library/react"
import { PageContent } from "../PageContent"

describe('PageContent', () => {

  it('should render', () => {
    render(<PageContent />)
    expect(screen.getByText(/PageContent/i)).toBeVisible()
  })
})
