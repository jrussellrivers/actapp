import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    postId:null
}

const postIdSlice = createSlice({
    name: 'postId',
    initialState,
    reducers: {
        changePostId(state, action) {
            state.postId = action.payload
        }
    }
})

export const { changePostId } = postIdSlice.actions

export default postIdSlice.reducer