import { createSlice } from "@reduxjs/toolkit";
import {
  fetchStudentThunk,
  createStudentThunk,
  editStudentThunk,
  deleteStudentThunk,
} from "./studentsThunk";

const fetchStudentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    loading: false,
    error: null,
    totalPages: null,
    totalStudents: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchStudentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.students;
        state.totalPages = action.payload.meta.totalPages;
        state.totalStudents = action.payload.meta.totalStudents;
      })
      .addCase(fetchStudentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      .addCase(createStudentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
        state.totalStudents += 1;
      })
      .addCase(createStudentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      .addCase(editStudentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editStudentThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { id, update } = action.payload;
        state.students = state.students.map((student) =>
          student._id === id ? { ...id, ...update } : student
        );
      })
      .addCase(editStudentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      .addCase(deleteStudentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter((student) => student._id !== action.payload._id);
        state.totalStudents -= 1;
      });
  },
});

export default fetchStudentSlice.reducer;
