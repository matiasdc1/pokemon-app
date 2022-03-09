import Loading from './Loading'
import { AiOutlineClose, AiOutlinePlus, AiOutlineSave } from 'react-icons/ai'

interface ButtonType {
  text: string
  icon?: 'close' | 'save' | 'add'
  onClick: () => void
  disabled?: boolean
  isLoading?: boolean
}

const Button: React.FC<ButtonType> = ({
  text,
  icon,
  onClick,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <button
      className="flex items-center px-4 py-2 space-x-2 text-white rounded-md bg-btn hover:bg-btnHigh"
      style={{
        opacity: disabled || isLoading ? '0.5' : '1',
        cursor: disabled || isLoading ? 'auto' : 'pointer',
      }}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      <Loading loading={isLoading} size={20} color="white" />
      {!isLoading && icon === 'close' && <AiOutlineClose size={20} />}
      {!isLoading && icon === 'add' && <AiOutlinePlus size={20} />}
      {!isLoading && icon === 'save' && <AiOutlineSave size={20} />}
      <p>{text}</p>
    </button>
  )
}

export default Button
