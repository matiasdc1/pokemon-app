import axios from 'axios'
import type { Pokemon, CreatePokemon } from '../types'

// Creates a pokemon. Must send a CreatePokemon Type body.
// Missing a property will result in an error, which is handled by the browser.
export const createPokemonFromAPI = async (body: CreatePokemon) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_APP_API}/pokemons`, {
      ...body,
    })
    const data: Pokemon = res.data
    return data
  } catch (e) {
    throw new Error('No se pudo crear este pokemon.')
  }
}
