import { createSubject } from "../../services/subjectServices";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllSubjects } from "../../services/subjectServices";
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllSubjects();
      return response;
    } catch (error) {
      // Return only a serializable error message string
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch subjects"
      );
    }
  }
);
