import { createSlice } from "@reduxjs/toolkit";
import { getExamTypeThunk, createExamTypeThunk, updateExamTypeThunk } from "./examTypeThunk";

const initialState = {
  examTypes: [],
  loading: false,
  error: null,
  totalCount: 0,
  totalPages: 0,
};

export const examTypeSlice = createSlice({
  name: "examType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExamTypeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExamTypeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.examTypes = action.payload.examTypes;
        state.totalCount = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getExamTypeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createExamTypeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExamTypeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.examTypes.push(action.payload);
      })
      .addCase(createExamTypeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateExamTypeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExamTypeThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updateType = action.payload;
        const index = state.examTypes.findIndex((i) => i._id === updateType._id);
        if (index !== -1) state.examTypes[index] = updateType;
      })
      .addCase(updateExamTypeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default examTypeSlice.reducer;
