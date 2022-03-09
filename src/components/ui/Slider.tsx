import { useState } from 'react'
import './Slider.css'

interface SliderType {
  text: string
  min: number
  max: number
  initialValue?: number
  onChange: (value: number) => void
}

const Slider: React.FC<SliderType> = ({
  text,
  min,
  max,
  initialValue = 50,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue)

  //Updates component state and callback function for state lifting.
  const handleChange = (e: number) => {
    setValue(e)
    onChange(e)
  }

  return (
    <div className="flex flex-col my-6 space-x-3 sm:flex-row">
      <p className="flex-1 text-left">{text}:</p>
      <div className="flex items-center space-x-2">
        <p>0</p>
        <input
          aria-label={text}
          className="cursor-pointer slider"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => handleChange(parseInt(e.target.value))}
        />
        <p>100</p>
      </div>
    </div>
  )
}

export default Slider
