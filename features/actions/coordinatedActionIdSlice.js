import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    coordinatedActionId:null
}

const actionIdSlice = createSlice({
    name: 'actionId',
    initialState,
    reducers: {
        changeCoordinatedActionId(state, action) {
            state.coordinatedActionId = action.payload
        }
    }
})

export const { changeCoordinatedActionId } = actionIdSlice.actions

export default actionIdSlice.reducer