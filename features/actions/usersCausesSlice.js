import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsersCauses = createAsyncThunk('usersCauses/fetchUsersCauses', async () => {
  const response = await fetch('http://localhost:3333/causes/users')
    .then(response => response.json())
    .then(data => data)
    console.log(response)
  return response
})

const initialState = {
  usersCauses: [],
  status: 'idle',
  error: null
}

const usersCausesSlice = createSlice({
  name: 'usersCauses',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsersCauses.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchUsersCauses.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched userscauses to the array
      state.usersCauses = action.payload
    },
    [fetchUsersCauses.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { getUsersCauses } = usersCausesSlice.actions

export default usersCausesSlice.reducer