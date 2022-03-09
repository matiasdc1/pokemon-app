import { render, screen } from '@testing-library/react'
import Button from '../../components/ui/Button'

test('if props disabled=true, button should be disabled ', () => {
  render(<Button text="placeholder" disabled={true} onClick={() => {}} />)
  expect(screen.getByRole('button', { name: /placeholder/i })).toBeDisabled()
})

test('if props isLoading=true, button should be disabled ', () => {
  render(<Button text="placeholder" isLoading={true} onClick={() => {}} />)
  expect(screen.getByRole('button', { name: /placeholder/i })).toBeDisabled()
})

test('if props isLoading=true and disabled=true, button should be disabled ', () => {
  render(
    <Button text="placeholder" isLoading={true} disabled={true} onClick={() => {}} />
  )
  expect(screen.getByRole('button', { name: /placeholder/i })).toBeDisabled()
})

test('if props no loading and no disabled, button should be enabled ', () => {
  render(<Button text="placeholder" onClick={() => {}} />)
  expect(screen.getByRole('button', { name: /placeholder/i })).toBeEnabled()
})
