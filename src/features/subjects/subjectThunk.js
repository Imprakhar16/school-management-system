import {
  createSubject,
  fetchAllSubjects,
  deleteSubject,
  updateSubject,
} from "../../services/subjectServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const createSubjectThunk = createAsyncThunk(
  "subject/createSubject",
  async (body, { rejectWithValue }) => {
    try {
      const response = await createSubject(body);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAllSubjectsThunk = createAsyncThunk(
  "subject/fetchAllSubjects",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await fetchAllSubjects({ page, limit, search });

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch subjects"
      );
    }
  }
);

export const deleteSubjectThunk = createAsyncThunk(
  "subject/deleteSubject",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await deleteSubject(_id); // Pass _id directly, not as object
      return { _id, ...response }; // Return _id so we can filter in reducer
    } catch (error) {
      return rejectWithValue(error.message || error.error || "Failed to delete subject");
    }
  }
);

export const updateSubjectThunk = createAsyncThunk(
  "subject/updateSubject",
  async ({ _id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await updateSubject(_id, updatedData);
      return response.subjectUpdate;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update subject");
    }
  }
);
