import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCauses = createAsyncThunk('causes/fetchCauses', async () => {
  const response = await fetch('http://localhost:3333/causes')
    .then(response => response.json())
    .then(data => data)
  return response
})

const initialState = {
  causes: [],
  status: 'idle',
  error: null
}

const causesSlice = createSlice({
  name: 'causes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCauses.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchCauses.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched causes to the array
      state.causes = state.causes.concat(action.payload)
    },
    [fetchCauses.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { getCauses } = causesSlice.actions

export default causesSlice.reducer