import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchPostById = createAsyncThunk('postById/fetchPostById', async (postId) => {
    const response = await fetch(`http://localhost:3333/post/${postId}`)
    .then(response=>response.json())
    .then(data=>data)
    return response
})

const initialState = {
    postById:{},
    status: 'idle',
    error: null
}

const postByIdSlice = createSlice({
    name: 'postById',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPostById.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchPostById.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched comments to the array
            state.postById = action.payload
        },
        [fetchPostById.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})


export default postByIdSlice.reducer