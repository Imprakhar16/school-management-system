import { createSlice } from "@reduxjs/toolkit";
import { forgotPasswordThunk, loginThunk, resetPasswordThunk } from "./authThunk";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Login failed";
      })

      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload?.message || "Password has been sent to your email";
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      //reset-password slice:
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.error;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
