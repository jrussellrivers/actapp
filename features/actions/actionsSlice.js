import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchActions = createAsyncThunk('likes/fetchActions', async () => {
  const response = await fetch('http://localhost:3333/actions')
    .then(response => response.json())
    .then(data => data)
  return response
})

const initialState = {
  actions: [],
  status: 'idle',
  error: null
}

const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchActions.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchActions.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched comments to the array
      state.actions = state.actions.concat(action.payload)
    },
    [fetchActions.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { getActions } = actionsSlice.actions

export default actionsSlice.reducer