import SearchBar from './components/SearchSection'
import ShowPokemon from './components/PokemonSection'
import ShowTable from './components/TableSection'
import { useAppSelector } from './store/hooks'

const App: React.FC = () => {
  const modifyState = useAppSelector((state) => state.app.modifyState)
  return (
    <div className="flex flex-col p-10 font-sans">
      <div className="w-full max-w-5xl mx-auto ">
        <SearchBar />
        <ShowTable />
        {modifyState && <ShowPokemon />}
      </div>
    </div>
  )
}

export default App
