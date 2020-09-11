import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'

export const fetchUser = createAsyncThunk('user/fetchUser', async (token) => {
    // const token = useSelector(state => state.token.token)
    console.log(token.token)
    const response = await fetch('http://localhost:3333/users/user', {headers:{'Authorization':token.token}})
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