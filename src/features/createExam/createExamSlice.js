import { createSlice } from "@reduxjs/toolkit";
import { createExamThunk } from "./createExamThunk";

const initialState = {
  exam: null,
  loading: false,
  error: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExamThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExamThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.exam = action.payload.exam;
      })
      .addCase(createExamThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create exam";
      });
  },
});

export default examSlice.reducer;
