import { createSlice } from "@reduxjs/toolkit";
import {
  createSubjectThunk,
  deleteSubjectThunk,
  fetchAllSubjectsThunk,
  updateSubjectThunk,
  getSubjectThunk,
} from "./subjectThunk";

const initialState = {
  data: [], // subjects list
  pagination: {}, // pagination info
  subjectDetails: null,
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
      // Create Subject
      .addCase(createSubjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSubjectThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data.push(action.payload);
      })
      .addCase(createSubjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to create subject";
      })

      // Fetch All Subjects
      .addCase(fetchAllSubjectsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubjectsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.subjects || [];
        state.pagination = {
          totalPages: action.payload?.meta?.totalPages || 1,
          currentPage: action.payload?.meta?.currentPage || 1,
          perPage: action.payload?.meta?.perPage || 10,
          totalSubjects: action.payload?.meta?.totalSubjects || 0,
        };
      })
      .addCase(fetchAllSubjectsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch subjects";
      })
      .addCase(deleteSubjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubjectThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((subject) => subject._id !== action.payload._id);
        state.success = true;
      })
      .addCase(deleteSubjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete subject";
      })
      .addCase(updateSubjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSubjectThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        const index = state.data.findIndex((subject) => subject._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateSubjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update subject";
      })
      .addCase(getSubjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.subjectDetails = action.payload.subjectDetails;
      })
      .addCase(getSubjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to get subject";
      });
  },
});

export const { resetSubjectState } = subjectSlice.actions;
export default subjectSlice.reducer;
