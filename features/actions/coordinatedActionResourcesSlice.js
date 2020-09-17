import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCoordinatedActionResources = createAsyncThunk('coordinatedActionResources/getCoordinatedActionResources', async (coordinatedActionId) => {
    console.log('made it')
    const response = await fetch(`http://localhost:3333/actions/coordinated/resources/${coordinatedActionId}`)
    .then(response=>response.json())
    .then(data=>data)
    return response
})

const initialState = {
    coordinatedActionResources:[]
}

const coordinatedActionResourcesSlice = createSlice({
    name: 'coordinatedActionResources',
    initialState,
    reducers: {
        getCoordinatedActionResources(state, action) {
            state.coordinatedActionResources = action.payload
        }
    },
    extraReducers: {
        [fetchCoordinatedActionResources.pending]: (state, action) => {
            state.status = 'loading'
          },
        [fetchCoordinatedActionResources.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched comments to the array
        state.coordinatedActionResources = action.payload
        },
        [fetchCoordinatedActionResources.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        }
    }
})

export const { getCoordinatedActionResources } = coordinatedActionResourcesSlice.actions

export default coordinatedActionResourcesSlice.reducer