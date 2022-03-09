import appSlice from './appSlice'
import pokemonReducer from './pokemonSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    app: appSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
