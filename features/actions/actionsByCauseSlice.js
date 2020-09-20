import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import url from '../../url'

export const fetchActionsByCause = createAsyncThunk('actionsByCause/fetchActionsByCause', async (cause) => {
    const response = await fetch(`${url}/actions/${cause}`)
    .then(response=>response.json())
    .then(data=>data)
    return response
})

const initialState = {
    actionsByCause:{},
    status: 'idle',
    error: null
}

const actionsByCauseSlice = createSlice({
    name: 'actionsByCause',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchActionsByCause.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchActionsByCause.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched comments to the array
            state.actionsByCause = action.payload
        },
        [fetchActionsByCause.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    }
})


export default actionsByCauseSlice.reducer