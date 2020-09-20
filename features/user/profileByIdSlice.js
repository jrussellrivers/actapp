import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import url from '../../url'

export const fetchProfileById = createAsyncThunk('profileById/fetchProfileById', async (profileId) => {
    const response = await fetch(`${url}/user/${profileId}`)
    .then(response=>response.json())
    .then(data=>data)
    return response
})

const initialState = {
    profileById:{},
    status: 'idle',
    error: null
}

const profileByIdSlice = createSlice({
    name: 'profileById',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProfileById.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchProfileById.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched comments to the array
            state.profileById = action.payload
        },
        [fetchProfileById.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})

export const { changeProfileById } = profileByIdSlice.actions

export default profileByIdSlice.reducer