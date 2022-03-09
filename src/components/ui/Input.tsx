import { useState } from 'react'

interface InputType {
  text: string
  placeholder?: string
  initialValue?: string
  onChange: (value: string) => void
}

const Input: React.FC<InputType> = ({
  text,
  placeholder = '',
  initialValue = '',
  onChange,
}) => {
  const [value, setValue] = useState(initialValue ?? '')

  //Updates component state and callback function for state lifting.
  const handleChange = (e: string) => {
    setValue(e)
    onChange(e)
  }

  return (
    <div className="my-3 sm:my-6">
      <div className="flex flex-col sm:items-center sm:space-x-2 sm:flex-row">
        <p className="w-20 text-left">{text}:</p>
        <input
          type="text"
          aria-label={text}
          placeholder={placeholder}
          className="w-full p-1 rounded-sm border-[1px] border-gray focus:outline-btn"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Input
