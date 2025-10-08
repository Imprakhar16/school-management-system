import { createSlice } from "@reduxjs/toolkit";
import {
  registerTeacherThunk,
  fetchAllTeachersThunk,
  updateTeacherThunk,
  deleteTeacherThunk,
} from "./teacherThunk";

const initialState = {
  teacher: null,
  teachers: [],
  meta: null,
  loading: false,
  error: null,
  success: false,
  pagination: {},
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    resetTeacherState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Teacher
      .addCase(registerTeacherThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerTeacherThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teacher = action.payload.teacher;
      })
      .addCase(registerTeacherThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All Teachers
      .addCase(fetchAllTeachersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTeachersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teachers = action.payload.teachers || [];
        state.meta = action.payload.meta;
        state.pagination = {
          page: action.payload.meta?.currentPage || 1,
          totalPages: action.payload.meta?.totalPages || 1,
          total: action.payload.meta?.totalTeachers || 0,
        };
      })
      .addCase(fetchAllTeachersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Teacher
      .addCase(updateTeacherThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTeacherThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teacher = action.payload.updatedTeacher;
        // Update teacher in list if exists
        const index = state.teachers.findIndex((t) => t._id === action.payload.updatedTeacher._id);
        if (index !== -1) state.teachers[index] = action.payload.updatedTeacher;
      })
      .addCase(updateTeacherThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Teacher
      .addCase(deleteTeacherThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacherThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teachers = state.teachers.filter((t) => t.id !== action.payload.id);
      })
      .addCase(deleteTeacherThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTeacherState } = teacherSlice.actions;
export default teacherSlice.reducer;
