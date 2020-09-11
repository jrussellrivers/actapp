import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchLikes = createAsyncThunk('likes/fetchLikes', async () => {
    const response = await fetch('http://localhost:3333/likes')
    .then(response=>response.json())
    .then(data=>data)
    return response
})

const initialState = {
    likes: [],
    status: 'idle',
    error: null
  }

const likesSlice = createSlice({
name: 'likes',
initialState,
reducers: {
  addLike(state, action) {
    state.likes.push(action.payload)
  }
},
extraReducers: {
    [fetchLikes.pending]: (state, action) => {
        state.status = 'loading'
      },
    [fetchLikes.fulfilled]: (state, action) => {
    state.status = 'succeeded'
    // Add any fetched comments to the array
    state.likes = state.likes.concat(action.payload)
    },
    [fetchLikes.rejected]: (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
    }
}
})

export const { addLike } = likesSlice.actions

export default likesSlice.reducer