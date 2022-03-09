interface SelectorType {
  text: string
  initialValue?: string
  onChange: (value: string) => void
}

const Selector: React.FC<SelectorType> = ({ text, initialValue = 'fire', onChange }) => {
  return (
    <div className="my-6">
      <div className="flex space-x-2 ">
        <p className="w-20 text-left ">{text}:</p>
        <select
          name="type"
          id="type"
          className=" rounded-sm border-[1px] border-border w-full focus:outline-btn"
          onChange={(e) => onChange(e.target.value)}
          defaultValue={initialValue}
        >
          <option value="fire">Fuego</option>
          <option value="water">Agua</option>
          <option value="normal">Normal</option>
          <option value="bug">Insecto</option>
          <option value="poison">Veneno</option>
        </select>
      </div>
    </div>
  )
}

export default Selector
