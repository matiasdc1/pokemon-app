import axios from 'axios'
import type { Pokemon, EditPokemon } from '../types'

//Edits a pokemon by Id from the API. Must have an id and a EditPokemon Type body.
export const editPokemonByIdFromAPI = async (id: number, body: EditPokemon) => {
  try {
    const res = await axios.put(`${import.meta.env.VITE_APP_API}/pokemons/${id}`, {
      ...body,
    })
    const data: Pokemon = res.data
    return data
  } catch (e) {
    throw new Error('No se pudo editar este pokemon.')
  }
}
