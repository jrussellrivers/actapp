import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    const response = await fetch('http://localhost:3333/comments')
    .then(response=>response.json())
    .then(data=>data)
    return response
})

const initialState = {
    comments: [],
    status: 'idle',
    error: null
  }

const commentsSlice = createSlice({
name: 'comments',
initialState,
reducers: {},
extraReducers: {
    [fetchComments.pending]: (state, action) => {
        state.status = 'loading'
      },
    [fetchComments.fulfilled]: (state, action) => {
    state.status = 'succeeded'
    // Add any fetched comments to the array
    state.comments = state.comments.concat(action.payload)
    },
    [fetchComments.rejected]: (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
    }
}
})

export default commentsSlice.reducer