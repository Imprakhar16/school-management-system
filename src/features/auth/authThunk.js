import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPassword, loginUser, resetPassword } from "../../services/authServices";

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await loginUser(body);
      return response;
    } catch (error) {
      return rejectWithValue("Login Failed", error);
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
