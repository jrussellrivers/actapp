import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import url from '../../url'

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    const response = await fetch(`${url}/comments`)
    .then(response=>response.json())
    .then(data=>data)
    return response
})

export const addCommentDB = async (comment, postId, userId, username, post_username) => {
  console.log('doin the fetch')
  const response = await fetch(`${url}/addComment/${comment}/${postId}/${userId}/${username}/${post_username}`, {method:'post'})
  console.log('finished the fetch')
  return response
}

const initialState = {
    comments: [],
    status: 'idle',
    error: null
  }

const commentsSlice = createSlice({
name: 'comments',
initialState,
reducers: {
  addComment(state, action) {
    state.comments.push(action.payload)
  }
},
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

export const { addComment } = commentsSlice.actions

export default commentsSlice.reducer