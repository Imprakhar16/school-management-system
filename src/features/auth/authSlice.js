import { createSlice } from "@reduxjs/toolkit"
import { loginUserThunk } from "./authThunk"

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.token = action.payload.data.token
        state.user = action.payload.data.user
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false

        state.error = action.payload || "Login failed"
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
