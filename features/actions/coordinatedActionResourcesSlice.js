import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCoordinatedActionResources = createAsyncThunk('coordinatedActionResources/fetchCoordinatedActionResources', async (coordinatedActionId) => {
    console.log('made it')
    const response = await fetch(`http://localhost:3333/actions/coordinated/resources/${coordinatedActionId}`)
    .then(response=>response.json())
    .then(data=>data)
    console.log(response)
    return response
})

const initialState = {
    coordinatedActionResources:[],
    status: 'idle',
    error: null
}

const coordinatedActionResourcesSlice = createSlice({
    name: 'coordinatedActionResources',
    initialState,
    reducers: {
        changeCoordinatedActionResourcesStatus(state, action) {
            state.status = action.payload
        }
    },
    extraReducers: {
        [fetchCoordinatedActionResources.pending]: (state, action) => {
            state.status = 'loading'
          },
        [fetchCoordinatedActionResources.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        state.coordinatedActionResources = action.payload
        },
        [fetchCoordinatedActionResources.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
        }
    }
})

export const { changeCoordinatedActionResourcesStatus } = coordinatedActionResourcesSlice.actions

export default coordinatedActionResourcesSlice.reducer