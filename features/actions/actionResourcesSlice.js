import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import url from '../../url'

export const fetchActionResources = createAsyncThunk('actionResources/fetchActionResources', async (actionId) => {
    console.log('made it')
    const response = await fetch(`${url}/actions/resources/${actionId}`)
    .then(response=>response.json())
    .then(data=>data)
    return response
})

const initialState = {
    actionResources:[],
    status: 'idle',
    error: null
}

const actionResourcesSlice = createSlice({
    name: 'actionResources',
    initialState,
    reducers: {
        changeActionResourcesStatus(state, action) {
            state.status = action.payload
        }
    },
    extraReducers: {
        [fetchActionResources.pending]: (state, action) => {
            state.status = 'loading'
          },
        [fetchActionResources.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched comments to the array
        state.actionResources = action.payload
        },
        [fetchActionResources.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        }
    }
})

export const { changeActionResourcesStatus } = actionResourcesSlice.actions

export default actionResourcesSlice.reducer