import axios from 'axios'
import type { Pokemon } from '../types'

//Hits API to get all pokemon from API.
export const getAllPokemonsFromAPI = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_API}/pokemons`)
    const data: Pokemon[] = res.data
    return data
  } catch (e) {
    throw new Error('No se pudieron cargar los pokemon.')
  }
}

//Hits API to get all pokemon from API where the name is equal to the one supplied.
export const getPokemonsByNameFromAPI = async (name: string) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_API}/pokemons`, {
      params: {
        name,
      },
    })
    const data: Pokemon[] = res.data
    return data
  } catch (e) {
    throw new Error('No se pudieron cargar los pokemon.')
  }
}

//Hits API to get all pokemon from API with the specified id.
//Not used by the App.
export const getPokemonByIdFromAPI = async (id: number) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_API}/pokemons/${id}`)
    const data: Pokemon = res.data
    return data
  } catch (e) {
    throw new Error('No se encontró el pokemon con este id.')
  }
}

//Hits API to get all pokemon from API where the idAuthor is the one supplied.
export const getPokemonsByIdAuthorFromAPI = async (idAuthor: number) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_API}/pokemons/`, {
      params: {
        idAuthor,
      },
    })
    const data: Pokemon = res.data
    return data
  } catch (e) {
    throw new Error('No se encontró el pokemon con este id.')
  }
}
