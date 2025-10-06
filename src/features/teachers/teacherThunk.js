import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginTeacher, registerTeacher } from "../../services/teacherServices";

//Login
export const loginTeacherThunk = createAsyncThunk(
  "teacher/loginTeacher",
  async (body, { rejectWithValue }) => {
    try {
      const data = await loginTeacher(body); // returns response.data
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Teacher login failed");
    }
  }
);

//Register
export const registerTeacherThunk = createAsyncThunk(
  "teacher/registerTeacher",
  async (body, { rejectWithValue }) => {
    try {
      const data = await registerTeacher(body); // returns response.data
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Teacher registration failed");
    }
  }
);
