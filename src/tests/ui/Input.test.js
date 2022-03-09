import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../../components/ui/Input'

test('when user types, value should be what the user types  ', () => {
  render(<Input text="placeholder" onChange={() => {}} />)
  userEvent.type(screen.getByRole('textbox'), 'Pikachu')
  expect(screen.getByRole('textbox')).toHaveValue('Pikachu')
})

test('when no initial value, should be empty', () => {
  render(<Input text="placeholder" onChange={() => {}} />)
  expect(screen.getByRole('textbox')).toHaveValue('')
})

test('when initial value is given, should have that value', () => {
  render(<Input text="placeholder" initialValue="initialValue" onChange={() => {}} />)
  expect(screen.getByRole('textbox')).toHaveValue('initialValue')
})

test('when initial value is given and user types, value should be the users', () => {
  render(<Input text="placeholder" initialValue="initialValue" onChange={() => {}} />)
  userEvent.clear(screen.getByRole('textbox'))
  userEvent.type(screen.getByRole('textbox'), 'Pikachu')
  expect(screen.getByRole('textbox')).toHaveValue('Pikachu')
})
