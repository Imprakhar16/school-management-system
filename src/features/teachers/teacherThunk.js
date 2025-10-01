import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginTeacher } from "../../services/teacherServices";

export const loginTeacherThunk = createAsyncThunk(
  "teacher/loginTeacher",
  async (body, { rejectWithValue }) => {
    try {
      const response = await loginTeacher(body);
      return response;
    } catch (error) {
      // ✅ rejectWithValue only accepts one argument
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  }
);
