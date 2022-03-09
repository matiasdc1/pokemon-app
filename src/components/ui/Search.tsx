import { AiOutlineSearch } from 'react-icons/ai'

interface SearchType {
  text: string
  onChange: (value: string) => void
}

const Search: React.FC<SearchType> = ({ text, onChange }) => {
  return (
    <div className="flex flex-row items-center space-x-2 border-[1px] rounded-md p-1 border-border bg-white">
      <AiOutlineSearch size={20} color="rgb(150,150,150)" />
      <input
        aria-label="search"
        type="text"
        className="w-full border-none focus:outline-none "
        placeholder={text}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default Search
