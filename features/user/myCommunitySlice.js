import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchMyCommunity = createAsyncThunk('myCommunity/fetchmyCommunity', async () => {
    const response = await fetch('http://localhost:3333/myCommunity')
    .then(response=>response.json())
    .then(data=>data)
    return response
})

export const addMyCommunityDB = async (userId, username,addId) => {
  const response = await fetch(`http://localhost:3333/addMyCommunity/${userId}/${username}/${addId}`, {method:'post'})
  return response
}

export const removeMyCommunityDB = async (userId,addId) => {
    const response = await fetch(`http://localhost:3333/removeMyCommunity/${userId}/${addId}`, {method:'post'})
    return response
  }

const initialState = {
    likes: [],
    status: 'idle',
    error: null
  }

const myCommunitySlice = createSlice({
name: 'myCommunity',
initialState,
reducers: {
  addMyCommunity(state, action) {
    state.myCommunity.push(action.payload)
  },
  changeMyCommunityStatus(state, action) {
    state.status = action.payload
  }
},
extraReducers: {
    [fetchMyCommunity.pending]: (state, action) => {
        state.status = 'loading'
      },
    [fetchMyCommunity.fulfilled]: (state, action) => {
    state.status = 'succeeded'
    // Add any fetched comments to the array
    state.myCommunity = action.payload
    },
    [fetchMyCommunity.rejected]: (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
    }
}
})

export const { addMyCommunity, changeMyCommunityStatus } = myCommunitySlice.actions

export default myCommunitySlice.reducer