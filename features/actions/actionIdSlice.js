import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    actionId:null
}

const actionIdSlice = createSlice({
    name: 'actionId',
    initialState,
    reducers: {
        changeActionId(state, action) {
            state.actionId = action.payload
        }
    }
})

export const { changeActionId } = actionIdSlice.actions

export default actionIdSlice.reducer