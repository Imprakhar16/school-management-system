import { createAsyncThunk } from "@reduxjs/toolkit";
import sectionService from "../../services/sectionServices";
export const fetchSectionsThunk = createAsyncThunk(
  "sections/fetchSections",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const data = await sectionService.fetchSections({ page, limit, search });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createSectionThunk = createAsyncThunk(
  "sections/createSection",
  async (sectionData, { rejectWithValue }) => {
    try {
      const data = await sectionService.createSection(sectionData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteSectionThunk = createAsyncThunk(
  "sections/deleteSection",
  async (sectionId, { rejectWithValue }) => {
    try {
      const data = await sectionService.deleteSection(sectionId);
      return { sectionId, ...data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateSectionThunk = createAsyncThunk(
  "sections/updateSection",
  async ({ sectionId, data }, { rejectWithValue }) => {
    try {
      const response = await sectionService.updateSection({ sectionId, data });
      return { sectionId, updatedData: response.section };
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to update section");
    }
  }
);
