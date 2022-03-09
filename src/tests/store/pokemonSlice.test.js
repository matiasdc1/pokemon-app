import reducer, {
  setPokemons,
  setSelectedPokemon,
  removeDeletedPokemon,
  editPokemon,
  addPokemon,
} from '../../store/pokemonSlice'

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    pokemons: [],
    selectedPokemon: null,
  })
})

test('should handle setting all pokemons when state is empty', () => {
  const previousState = {
    pokemons: [],
    selectedPokemon: null,
  }
  const pkmns = [
    { id: 1, name: 'Pikachu' },
    { id: 2, name: 'Squirtle' },
  ]
  expect(reducer(previousState, setPokemons(pkmns))).toEqual({
    pokemons: pkmns,
    selectedPokemon: null,
  })
})

test('should handle setting all pokemons when state is not empty', () => {
  const previousState = {
    pokemons: [
      { id: 1, name: 'Charmander' },
      { id: 2, name: 'Charizard' },
    ],
    selectedPokemon: null,
  }
  const pkmns = [
    { id: 1, name: 'Pikachu' },
    { id: 2, name: 'Squirtle' },
  ]
  expect(reducer(previousState, setPokemons(pkmns))).toEqual({
    pokemons: pkmns,
    selectedPokemon: null,
  })
})

test('should handle setting a selected pokemon when selected is empty', () => {
  const previousState = {
    pokemons: [],
    selectedPokemon: null,
  }
  const pkmn = { id: 2, name: 'Squirtle' }

  expect(reducer(previousState, setSelectedPokemon(pkmn))).toEqual({
    pokemons: [],
    selectedPokemon: pkmn,
  })
})

test('should handle setting a selected pokemon when there is already a selected', () => {
  const previousState = {
    pokemons: [],
    selectedPokemon: { id: 2, name: 'Squirtle' },
  }
  const pkmn = { id: 3, name: 'Charmander' }

  expect(reducer(previousState, setSelectedPokemon(pkmn))).toEqual({
    pokemons: [],
    selectedPokemon: pkmn,
  })
})

test('should handle adding a pokemon', () => {
  const previousState = {
    pokemons: [{ id: 2, name: 'Squirtle' }],
    selectedPokemon: null,
  }
  const pkmn = { id: 3, name: 'Charmander' }

  expect(reducer(previousState, addPokemon(pkmn))).toEqual({
    pokemons: [
      { id: 2, name: 'Squirtle' },
      { id: 3, name: 'Charmander' },
    ],
    selectedPokemon: null,
  })
})

test('should handle editing a pokemon', () => {
  const previousState = {
    pokemons: [
      { id: 1, name: 'Squirtle' },
      { id: 2, name: 'Charmander' },
    ],
    selectedPokemon: null,
  }
  const id = 1
  const pkmn = { id: 1, name: 'Eevee', type: 'normal' }
  const newValue = reducer(previousState, editPokemon({ id, pokemon: pkmn }))
  expect(newValue).toEqual({
    pokemons: [
      { id: 1, name: 'Eevee', type: 'normal' },
      { id: 2, name: 'Charmander' },
    ],
    selectedPokemon: null,
  })
})

test('should handle deleting a pokemon', () => {
  const previousState = {
    pokemons: [
      { id: 2, name: 'Squirtle' },
      { id: 3, name: 'Charmander' },
    ],
    selectedPokemon: null,
  }
  const id = 2

  expect(reducer(previousState, removeDeletedPokemon(id))).toEqual({
    pokemons: [{ id: 3, name: 'Charmander' }],
    selectedPokemon: null,
  })
})
