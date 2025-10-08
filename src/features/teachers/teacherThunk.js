import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllTeachers, registerTeacher } from "../../services/teacherServices";

//Register
export const registerTeacherThunk = createAsyncThunk(
  "teacher/registerTeacher",
  async (body, { rejectWithValue }) => {
    try {
      const data = await registerTeacher(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Teacher registration failed");
    }
  }
);

//Fetch All Tearchers
export const fetchAllTeachersThunk = createAsyncThunk(
  "subject/fetchAllTeachers",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await fetchAllTeachers({ page, limit, search });

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch subjects"
      );
    }
  }
);
