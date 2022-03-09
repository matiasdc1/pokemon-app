import Loading from './ui/Loading'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { BsCardImage } from 'react-icons/bs'
import { MdOutlineImageNotSupported } from 'react-icons/md'
import { Pokemon } from '../types'
import { useWindowSize } from '../hooks/useWindowResize'

interface TableRowType {
  pkmn: Pokemon
  idDeleting: number | null
  handleNavigation: (arg: string) => void
  handleEdit: (arg: Pokemon) => void
  handleDelete: (arg: number) => void
}
const TableRow: React.FC<TableRowType> = ({
  pkmn,
  idDeleting,
  handleNavigation,
  handleEdit,
  handleDelete,
}) => {
  const size = useWindowSize()

  return (
    <tr
      data-testid="table-row"
      key={pkmn.id}
      className="border-b-[1px] border-border items-center"
    >
      <td className="py-2" data-testid="table-pokemon">
        {pkmn.name}
      </td>
      {/* Image is conditionally rendered, hidden when screen width is small */}
      {size.width && size.width > 500 && (
        <td className="flex items-center justify-center py-2 text-border ">
          {/* If there is an image, show Image icon with click capabilities, else show no Image icon. */}
          {pkmn.image ? (
            <BsCardImage
              className="cursor-pointer hover:text-gray"
              size={30}
              onClick={() => handleNavigation(pkmn.image)}
            />
          ) : (
            <MdOutlineImageNotSupported size={30} />
          )}
        </td>
      )}
      <td>{pkmn.attack}</td>
      <td>{pkmn.defense}</td>
      <td className="flex justify-evenly text-btn">
        <AiOutlineEdit
          data-testid="edit-button"
          className="cursor-pointer hover:text-btnHigh"
          size={30}
          onClick={() => handleEdit(pkmn)}
        />
        {/* If a pokemon is being deleted, show spinner on that pokemon, else, show delete icon */}
        {idDeleting && idDeleting === pkmn.id ? (
          <Loading loading={true} size={30} color="red" />
        ) : (
          <AiOutlineDelete
            data-testid="delete-button"
            className="cursor-pointer hover:text-red"
            size={30}
            onClick={() => handleDelete(pkmn.id)}
          />
        )}
      </td>
    </tr>
  )
}

export default TableRow
