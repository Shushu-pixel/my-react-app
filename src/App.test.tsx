import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('starter homepage', () => {
  it('shows the homepage and links to the toolkit and documentation', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Small beginnings.')
    expect(screen.getByRole('link', { name: /start exploring/i })).toHaveAttribute('href', '#resources')
    for (const href of ['https://react.dev/learn', 'https://www.typescriptlang.org/docs/', 'https://vite.dev/guide/']) {
      expect(screen.getAllByRole('link').some((link) => link.getAttribute('href') === href)).toBe(true)
    }
  })

  it('increments the live counter and uses the correct singular label', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getAllByRole('status')[0]).toHaveTextContent('0 clicks and counting')
    await user.click(screen.getByRole('button', { name: /give it a click/i }))
    expect(screen.getAllByRole('status')[0]).toHaveTextContent('1 click and counting')
    await user.click(screen.getByRole('button', { name: /give it a click/i }))
    expect(screen.getAllByRole('status')[0]).toHaveTextContent('2 clicks and counting')
  })
})
