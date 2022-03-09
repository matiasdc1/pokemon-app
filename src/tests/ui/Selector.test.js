import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Selector from '../../components/ui/Selector'

test('when no initial value, value should be fire  ', () => {
  render(<Selector text="placeholder" onChange={() => {}} />)
  expect(screen.getByRole('option', { name: /fuego/i }).selected).toBe(true)
})

test('when initial value, value should be initial value', () => {
  render(<Selector text="placeholder" initialValue="bug" onChange={() => {}} />)
  expect(screen.getByRole('option', { name: /insecto/i }).selected).toBe(true)
})

test('when initial value=bug, value should not be fire ', () => {
  render(<Selector text="placeholder" initialValue="bug" onChange={() => {}} />)
  expect(screen.getByRole('option', { name: /fuego/i }).selected).toBe(false)
})

test('if user selects a value, value should be the selected one ', () => {
  render(<Selector text="placeholder" onChange={() => {}} />)
  userEvent.click(screen.getByRole('option', { name: /insecto/i }))
  expect(screen.getByRole('option', { name: /insecto/i }).selected).toBe(false)
})
