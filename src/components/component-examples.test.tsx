import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it } from 'vitest'
import { ComponentExamples } from './component-examples'

it('saves and resets the Card example using shadcn Buttons', async () => {
  const user = userEvent.setup()
  render(<ComponentExamples />)
  const save = screen.getByRole('button', { name: 'Save example' })
  await user.click(save)
  expect(screen.getByRole('status')).toHaveTextContent('Example saved.')
  expect(save).toBeDisabled()
  await user.click(screen.getByRole('button', { name: 'Reset example' }))
  expect(save).toBeEnabled()
  expect(screen.getByRole('status')).toHaveTextContent('Try the buttons below')
  expect(screen.getByRole('link', { name: 'Browse components' })).toHaveAttribute('href', 'https://ui.shadcn.com/docs/components')
})
