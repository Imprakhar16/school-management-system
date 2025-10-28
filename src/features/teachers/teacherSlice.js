import { createSlice } from "@reduxjs/toolkit";
import {
  registerTeacherThunk,
  fetchAllTeachersThunk,
  updateTeacherThunk,
  deleteTeacherThunk,
  getTeacherThunk,
} from "./teacherThunk";

const initialState = {
  teacher: null,
  teachers: [],
  teacherDetails: null,
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
        const updated = action.payload.updatedTeacher;
        state.teacher = updated;
        const index = state.teachers.findIndex((t) => t._id === updated._id);
        if (index !== -1) state.teachers[index] = updated;
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
      })
      .addCase(getTeacherThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teacherDetails = action.payload.teacherDetails;
      })
      .addCase(getTeacherThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to get teacher";
      });
  },
});

export const { resetTeacherState } = teacherSlice.actions;
export default teacherSlice.reducer;
