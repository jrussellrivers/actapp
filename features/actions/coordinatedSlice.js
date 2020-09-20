import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import url from '../../url'

export const fetchCoordinatedActions = createAsyncThunk('coordinatedActions/fetchCoordinatedActions', async () => {
  console.log('made it')
  const response = await fetch(`${url}/actions/coordinated/actions`)
    .then(response => response.json())
    .then(data => data)
  return response
})

const initialState = {
  coordinatedActions: [],
  status: 'idle',
  error: null
}

const coordinatedActionsSlice = createSlice({
  name: 'coordinatedActions',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCoordinatedActions.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchCoordinatedActions.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched coordinated actions to the array
      console.log(state.coordinatedActions)
      state.coordinatedActions = action.payload
      console.log(action.payload)
    },
    [fetchCoordinatedActions.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { getCoordinatedActions } = coordinatedActionsSlice.actions

export default coordinatedActionsSlice.reducer