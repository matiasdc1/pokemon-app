import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LoadingState {
  tableLoading: boolean
  modifyState: 'create' | 'edit' | null
}

const initialState: LoadingState = {
  tableLoading: false,
  modifyState: null,
}

//Reducer where you can find app specific states.

export const appState = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setLoadingTable: (state, action: PayloadAction<boolean>) => {
      state.tableLoading = action.payload
    },
    setModifyState: (state, action: PayloadAction<'create' | 'edit' | null>) => {
      state.modifyState = action.payload
    },
  },
})

export const { setLoadingTable, setModifyState } = appState.actions

export default appState.reducer
