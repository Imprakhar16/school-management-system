import { createAsyncThunk } from "@reduxjs/toolkit";
import { createExam } from "../../services/createExamSevices";

export const createExamThunk = createAsyncThunk(
  "exam/createExam",
  async (body, { rejectWithValue }) => {
    try {
      const response = await createExam(body);
      return response;
    } catch (error) {
      return rejectWithValue("Process Failed", error);
    }
  }
);
