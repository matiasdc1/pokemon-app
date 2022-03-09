import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from '../../components/ui/Search'

test('when user types, value should be what the user types  ', () => {
  render(<Search text="placeholder" onChange={() => {}} />)
  userEvent.type(screen.getByRole('textbox'), 'Pikachu')
  expect(screen.getByRole('textbox')).toHaveValue('Pikachu')
})
