import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    registeredUser:{}
}

const registeredUserSlice = createSlice({
    name: 'registeredUser',
    initialState,
    reducers: {
        changeRegisteredUser(state, action) {
            state.registeredUser = action.payload
        }
    }
})

export const { changeRegisteredUser } = registeredUserSlice.actions

export default registeredUserSlice.reducer