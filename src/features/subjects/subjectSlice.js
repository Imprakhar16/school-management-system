import { createSlice } from "@reduxjs/toolkit";
import { createSubjectThunk, fetchAllSubjectsThunk } from "./subjectThunk";

const initialState = {
  subjects: [],
  loading: false,
  error: null,
  success: false,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    resetSubjectState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSubjectThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.subjects.push(action.payload); // add the new subject
      })
      .addCase(createSubjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to create subject";
      })
      .addCase(fetchAllSubjectsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubjectsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload || [];
      })
      .addCase(fetchAllSubjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch subjects";
      });
  },
});

export const { resetSubjectState } = subjectSlice.actions;
export default subjectSlice.reducer;
