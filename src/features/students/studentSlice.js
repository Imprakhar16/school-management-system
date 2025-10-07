import { createSlice } from "@reduxjs/toolkit";
import { fetchStudentThunk, createStudentThunk } from "./studentsThunk";

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
      })
      .addCase(createStudentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default fetchStudentSlice.reducer;
