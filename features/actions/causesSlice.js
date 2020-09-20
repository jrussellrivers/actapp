import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import url from '../../url'

export const fetchCauses = createAsyncThunk('causes/fetchCauses', async () => {
  const response = await fetch(`${url}/causes`)
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
  reducers: {
    changeCausesStatus(state, action) {
      state.status = action.payload
    },
  },
  extraReducers: {
    [fetchCauses.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchCauses.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched causes to the array
      state.causes = action.payload
    },
    [fetchCauses.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { changeCausesStatus } = causesSlice.actions

export default causesSlice.reducer