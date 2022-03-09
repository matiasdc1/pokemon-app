import axios from 'axios'
import type { Pokemon } from '../types'

//Deletes a Pokemon by Id from the API.
export const deletePokemonByIdFromAPI = async (id: number) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_APP_API}/pokemons/${id}`)
    const data: Pokemon = res.data
    return data
  } catch (e) {
    throw new Error('No se pudo borrar este pokemon.')
  }
}
