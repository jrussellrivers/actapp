import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    causeId:null
}

const causeIdSlice = createSlice({
    name: 'causeId',
    initialState,
    reducers: {
        changeCauseId(state, action) {
            state.causeId = action.payload
        }
    }
})

export const { changeCauseId } = causeIdSlice.actions

export default causeIdSlice.reducer