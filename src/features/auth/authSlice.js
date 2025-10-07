import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPasswordThunk,
  loginPrincipalThunk,
  loginStudentThunk,
  loginTeacherThunk,
  resetPasswordThunk,
} from "./authThunk";

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
      .addCase(loginPrincipalThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginPrincipalThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
      })
      .addCase(loginPrincipalThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Login failed";
      })
      .addCase(loginTeacherThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginTeacherThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
      })
      .addCase(loginTeacherThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Login failed";
      })

      .addCase(loginStudentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStudentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.user = action.payload.data.user;
      })
      .addCase(loginStudentThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Login failed";
      })
      //forgot-password slice:
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
