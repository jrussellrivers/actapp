import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'

export const fetchUserPics = createAsyncThunk('userPics/fetchUserPics', async () => {
    // const token = useSelector(state => state.token.token)
    const response = await fetch('http://localhost:3333/userpics')
    .then(response=>response.json())
    .then(data=>data)
    return response
})

const initialState = {
    userPics: {},
    status: 'idle',
    error: null
  }

const userPicsSlice = createSlice({
name: 'userPics',
initialState,
reducers: {
  changeUserPicsStatus(state, action) {
    state.status = action.payload
  }
},
extraReducers: {
    [fetchUserPics.pending]: (state, action) => {
        state.status = 'loading'
      },
    [fetchUserPics.fulfilled]: (state, action) => {
    state.status = 'succeeded'
    // Add any fetched comments to the array
    state.userPics = action.payload
    },
    [fetchUserPics.rejected]: (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
    }
}
})

export const { changeUserPicsStatus } = userPicsSlice.actions

export default userPicsSlice.reducer