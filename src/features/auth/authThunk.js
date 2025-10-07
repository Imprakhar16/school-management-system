import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  forgotPassword,
  loginPrincipal,
  resetPassword,
  loginTeacher,
  loginStudent,
} from "../../services/authServices";

export const loginPrincipalThunk = createAsyncThunk(
  "auth/loginPrincipal",
  async (body, { rejectWithValue }) => {
    try {
      const response = await loginPrincipal(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || "Login Failed");
    }
  }
);

export const loginTeacherThunk = createAsyncThunk(
  "auth/loginTeacher",
  async (body, { rejectWithValue }) => {
    try {
      const response = await loginTeacher(body);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || { error: "Login failed" });
    }
  }
);

export const loginStudentThunk = createAsyncThunk(
  "auth/loginStudent",
  async (body, { rejectWithValue }) => {
    try {
      const response = await loginStudent(body);
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data || { error: "Login failed" });
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgot-password",
  async (email, { rejectWithValue }) => {
    try {
      const response = await forgotPassword(email);
      return response;
    } catch (error) {
      return rejectWithValue("Process Failed", error);
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/reset-password",
  async (credential, { rejectWithValue }) => {
    try {
      const response = await resetPassword(credential);
      return response;
    } catch (error) {
      return rejectWithValue("Process Failed:", error);
    }
  }
);
