import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {useSelector} from 'react-redux'

export const fetchUser = createAsyncThunk('user/fetchUser', async (token) => {
    const response = await fetch('http://localhost:3333/user', {headers:{'Authorization':token.token}})
    .then(response=>response.json())
    .then(data=>data)
    return response
})

export const changeNoteDateDB = (timestamp, id) => {
  return fetch(`http://localhost:3333/changeNoteDate/${timestamp}/${id}`, {method:'post'})
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

export const { changeUserStatus, changeNotificationDate, updateAddress } = userSlice.actions

export default userSlice.reducer