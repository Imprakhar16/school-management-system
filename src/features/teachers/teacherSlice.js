import { createSlice } from "@reduxjs/toolkit";
import { loginTeacherThunk, registerTeacherThunk } from "./teacherThunk";

const initialState = {
  teacher: null,
  token: null,
  loading: false,
  error: null,
  success: false,
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
    resetTeacherState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
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
        state.success = true;
        state.token = action.payload.token;
        state.teacher = action.payload.teacher;
      })
      .addCase(loginTeacherThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(registerTeacherThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerTeacherThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teacher = action.payload.teacher;
      })
      .addCase(registerTeacherThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetTeacherState } = teacherSlice.actions;
export default teacherSlice.reducer;
