import reducer, { setLoadingTable, setModifyState } from '../../store/appSlice'

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual({
    tableLoading: false,
    modifyState: null,
  })
})

test('should handle updating table state to true', () => {
  const previousState = { tableLoading: false, modifyState: null }

  expect(reducer(previousState, setLoadingTable(true))).toEqual({
    tableLoading: true,
    modifyState: null,
  })
})

test('should handle updating modifyState to create', () => {
  const previousState = { tableLoading: false, modifyState: null }

  expect(reducer(previousState, setModifyState('create'))).toEqual({
    tableLoading: false,
    modifyState: 'create',
  })
})

test('should handle updating modifyState to null', () => {
  const previousState = { tableLoading: false, modifyState: 'create' }

  expect(reducer(previousState, setModifyState(null))).toEqual({
    tableLoading: false,
    modifyState: null,
  })
})
