import Button from './ui/Button'
import Search from './ui/Search'
import { debounce } from 'lodash'
import { getAllPokemonsFromAPI, getPokemonsByNameFromAPI } from '../api'
import { setLoadingTable, setModifyState } from '../store/appSlice'
import { setPokemons, setSelectedPokemon } from '../store/pokemonSlice'
import { useAppDispatch } from '../store/hooks'
import { useCallback, useEffect, useState } from 'react'

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState('')

  //Only execute debounced search if there are more than 2 characters.
  useEffect(() => {
    if (search.length > 2) {
      debounceSearch(search)
    }
  }, [search])

  //Creation of a debounced function to not hit the API on every input change.
  const debounceSearch = useCallback(
    debounce(async (search) => {
      try {
        dispatch(setLoadingTable(true))
        const pkmns = await getPokemonsByNameFromAPI(search)
        dispatch(setPokemons(pkmns))
        dispatch(setLoadingTable(false))
      } catch (e) {
        dispatch(setLoadingTable(false))
      }
    }, 500),
    []
  )

  //When a new pokemon will be created, the selected pokemon is in blank state.
  //To ensure that the create pokemon inputs are empty, modify state goes to null, then to create.
  //setTimeout fixes the previous comment bug.
  const handleNew = () => {
    dispatch(setSelectedPokemon(null))
    dispatch(setModifyState(null))
    setTimeout(() => dispatch(setModifyState('create')), 10)
  }

  //Hits the API to find all pokemon when the button is pressed.
  //Shows the loading table icon while the API responds.
  //Saves the information in the pokemon state.
  const handleSearchAll = async () => {
    try {
      dispatch(setLoadingTable(true))
      const res = await getAllPokemonsFromAPI()
      dispatch(setPokemons(res))
      dispatch(setLoadingTable(false))
    } catch (e) {
      dispatch(setLoadingTable(false))
    }
  }
  return (
    <section className="flex flex-col justify-between md:flex-row">
      <div className="my-2">
        <h1 className="my-2">Listado de Pokemon</h1>
        <Search text="Buscar" onChange={(e) => setSearch(e)} />
      </div>
      <div className="flex flex-row self-end space-x-2">
        <Button text="Buscar todos" onClick={handleSearchAll} />
        <Button text="Nuevo" icon="add" onClick={handleNew} />
      </div>
    </section>
  )
}

export default SearchBar
