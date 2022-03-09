import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { filter, findIndex } from 'lodash'
import type { Pokemon } from '../types'

interface PokemonState {
  pokemons: Pokemon[]
  selectedPokemon: Pokemon | null
}

const initialState: PokemonState = {
  pokemons: [],
  selectedPokemon: null,
}

//Reducer where you can find the pokemon states.

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemons = action.payload
    },
    setSelectedPokemon: (state, action: PayloadAction<Pokemon | null>) => {
      state.selectedPokemon = action.payload
    },
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.pokemons = [...state.pokemons, action.payload]
    },
    editPokemon: (state, action: PayloadAction<{ id: number; pokemon: Pokemon }>) => {
      const _pokemons = [...state.pokemons]
      const index = findIndex(_pokemons, { id: action.payload.id })
      _pokemons[index] = action.payload.pokemon
      state.pokemons = [..._pokemons]
    },
    removeDeletedPokemon: (state, action: PayloadAction<number>) => {
      const filtered = filter(state.pokemons, (pkmn) => pkmn.id !== action.payload)
      state.pokemons = filtered
    },
  },
})

export const {
  setPokemons,
  setSelectedPokemon,
  removeDeletedPokemon,
  editPokemon,
  addPokemon,
} = pokemonSlice.actions

export default pokemonSlice.reducer
