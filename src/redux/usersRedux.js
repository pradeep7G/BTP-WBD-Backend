import { createSlice } from "@reduxjs/toolkit"
import { logoutStart } from "./userRedux"

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isFetching: false,
    error: false
  },
  reducers: {
    //GET ALL
    getUsersStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false
      state.users = action.payload
    },
    getUsersFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    //DELETE
    deleteUserStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      )
    },
    deleteUserFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    //UPDATE
    updateUserStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false
      state.users[
        state.users.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.user
    },
    updateUserFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    //ADD
    addUserStart: (state) => {
      state.isFetching = true
      state.error = false
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false
      state.users.push(action.payload)
    },
    addUserFailure: (state) => {
      state.isFetching = false
      state.error = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logoutStart, (state, action) => {
      state.users = []
      state.isFetching = false
      state.error = false
    })
  }
})

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure
} = usersSlice.actions

export default usersSlice.reducer
