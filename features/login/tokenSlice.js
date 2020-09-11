import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// export const fetchtoken = createAsyncThunk('token/fetchtoken', async () => {
//     const response = await fetch('http://localhost:3333/tokens/token', {headers:{'Authorization':'jwt'}})
//     .then(response=>response.json())
//     .then(data=>console.log(data))
//     return response
// })

const initialState = {
    token: {},
    status: 'idle',
    error: null
  }

const tokenSlice = createSlice({
name: 'token',
initialState,
reducers: {
    changeToken(state, action) {
        state.token = action.payload
      }
}
})

export const { changeToken } = tokenSlice.actions

export default tokenSlice.reducer