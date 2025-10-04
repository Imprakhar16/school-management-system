import { createSlice } from "@reduxjs/toolkit";
import { loginTeacherThunk } from "./teacherThunk";

const initialState = {
  teacher: null,
  token: null,
  loading: false,
  error: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    logout: (state) => {
      state.teacher = null;
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTeacherThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginTeacherThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.data.token;
        state.teacher = action.payload.data.teacher;
      })
      .addCase(loginTeacherThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = teacherSlice.actions;
export default teacherSlice.reducer;
