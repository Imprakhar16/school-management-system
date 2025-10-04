import { createSlice } from "@reduxjs/toolkit";
import {
  createSectionThunk,
  deleteSectionThunk,
  fetchSectionsThunk,
  updateSectionThunk,
} from "./sectionThunk";

const sectionSlice = createSlice({
  name: "sections",
  initialState: {
    sections: [],
    loading: false,
    error: null,
    totalCount: null,
    totalPages: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectionsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSectionsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload.sections || [];
        state.totalCount = action.payload.meta.totalSections || 0;
        state.totalPages = action.payload.meta.totalPages || 0;
      })
      .addCase(fetchSectionsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch sections";
      })

      // createSection
      .addCase(createSectionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSectionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.sections.push(action.payload.section);
        state.totalCount += 1;
      })
      .addCase(createSectionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create section";
      })
      .addCase(deleteSectionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSectionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = state.sections.filter(
          (section) => section._id !== action.payload.sectionId
        );
        state.totalCount -= 1;
      })
      .addCase(deleteSectionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete section";
      })

      .addCase(updateSectionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSectionThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { sectionId, updatedData } = action.payload;

        state.sections = state.sections.map((section) =>
          section._id === sectionId ? { ...section, ...updatedData } : section
        );
      })
      .addCase(updateSectionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update section";
      });
  },
});

export const { setPage, setRowsPerPage } = sectionSlice.actions;

export default sectionSlice.reducer;
