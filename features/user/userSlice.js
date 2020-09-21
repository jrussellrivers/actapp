import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import url from '../../url'

export const fetchUser = createAsyncThunk('user/fetchUser', async (token) => {
    const response = await fetch(`${url}/user`, {headers:{'Authorization':token.token}})
    .then(response=>response.json())
    .then(data=>data)
    return response
})

export const changeNoteDateDB = (timestamp, id) => {
  return fetch(`${url}/changeNoteDate/${timestamp}/${id}`, {method:'post'})
}

const initialState = {
    user: {},
    status: 'idle',
    error: null
  }

const userSlice = createSlice({
name: 'user',
initialState,
reducers: {
  changeUserStatus(state, action) {
    state.status = action.payload
  },
  changeNotificationDate(state, action) {
    state.user.notification_check = action.payload
  },
  updateAddress(state, action) {
    state.user.streetaddress = action.payload
  },
  updateCity(state, action) {
    state.user.city = action.payload
  },
  updateState(state, action) {
    state.user.state = action.payload
  },
  updateZipcode(state, action) {
    state.user.zipcode = action.payload
  }
},
extraReducers: {
    [fetchUser.pending]: (state, action) => {
        state.status = 'loading'
      },
    [fetchUser.fulfilled]: (state, action) => {
    state.status = 'succeeded'
    state.user = action.payload
    },
    [fetchUser.rejected]: (state, action) => {
    state.status = 'failed'
    state.error = action.error.message
    }
}
})

export const { changeUserStatus, changeNotificationDate, updateAddress, updateCity, updateState, updateZipcode } = userSlice.actions

export default userSlice.reducer