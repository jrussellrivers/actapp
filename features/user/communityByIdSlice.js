import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import url from '../../url'

export const fetchCommunityById = createAsyncThunk('communityById/fetchCommunityById', async (adder_id) => {
    const response = await fetch(`${url}/communityById/${adder_id}`)
    .then(response=>response.json())
    .then(data=>data)
    return response
})

const initialState = {
    communityById: [],
    status: 'idle',
    error: null
  }

const communityByIdSlice = createSlice({
name: 'communityById',
initialState,
reducers: {},
extraReducers: {
    [fetchCommunityById.pending]: (state, action) => {
        state.status = 'loading'
      },
    [fetchCommunityById.fulfilled]: (state, action) => {
    state.status = 'succeeded'
    // Add any fetched comments to the array
    state.communityById = action.payload
    },
    [fetchCommunityById.rejected]: (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
    }
}
})

export default communityByIdSlice.reducer