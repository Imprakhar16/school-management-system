import { createSlice } from "@reduxjs/toolkit";
import { registerTeacherThunk, fetchAllTeachersThunk } from "./teacherThunk";

const initialState = {
  teacher: null,
  teachers: [],
  meta: null, // ✅ Add meta to initial state
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
      // ✅ Register Teacher
      .addCase(registerTeacherThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerTeacherThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teacher = action.payload.teacher;
        state.pagination = {
          totalPages: action.meta?.totalPages || 1,
          currentPage: action.meta?.currentPage || 1,
          perPage: action.meta?.perPage || 10,
          totalTeachers: action.meta?.totalTeachers || 0,
        };
      })
      .addCase(registerTeacherThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch All Teachers
      .addCase(fetchAllTeachersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTeachersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.teachers = action.payload.teachers || []; // ✅ Fixed
        state.meta = action.payload.meta; // ✅ Store meta
        state.pagination = {
          page: action.payload.meta?.currentPage || 1,
          totalPages: action.payload.meta?.totalPages || 1,
          total: action.payload.meta?.totalTeachers || 0,
        };
      })
      .addCase(fetchAllTeachersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTeacherState } = teacherSlice.actions;
export default teacherSlice.reducer;
