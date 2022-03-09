import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TableRow from '../components/TableRow'

const pkmn = {
  id: 645,
  name: 'Bulbasaur',
  image: 'https://imagenpng.com/wp-content/uploads/2016/09/Pikachu-png-1-635x624.png',
  type: 'bug',
  hp: 50,
  attack: 50,
  defense: 50,
  idAuthor: 1,
  created_at: '2022-02-24T16:09:23.247Z',
  updated_at: '2022-03-08T02:59:03.109Z',
}

test('when idDeleting != pokemon id, show delete icon  ', () => {
  render(
    <table>
      <tbody>
        <TableRow
          pkmn={pkmn}
          idDeleting={500}
          handleNavigation={() => {}}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      </tbody>
    </table>
  )
  expect(screen.queryByTestId('delete-button')).toBeTruthy()
})

test('when idDeleting == pokemon id, do not show delete button', () => {
  render(
    <table>
      <tbody>
        <TableRow
          pkmn={pkmn}
          idDeleting={pkmn.id}
          handleNavigation={() => {}}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      </tbody>
    </table>
  )

  expect(screen.queryByTestId('delete-icon')).toBeFalsy()
})
