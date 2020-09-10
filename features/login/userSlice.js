import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await fetch('http://localhost:3333/users/user', {headers:{'Authorization':'jwt'}})
    .then(response=>response.json())
    .then(data=>console.log(data))
    return response
})

const initialState = {
    user: {},
    status: 'idle',
    error: null
  }

const userSlice = createSlice({
name: 'user',
initialState,
reducers: {},
extraReducers: {
    [fetchUser.pending]: (state, action) => {
        state.status = 'loading'
      },
    [fetchUser.fulfilled]: (state, action) => {
    state.status = 'succeeded'
    // Add any fetched comments to the array
    state.user = action.payload
    },
    [fetchUser.rejected]: (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
    }
}
})

export default userSlice.reducer