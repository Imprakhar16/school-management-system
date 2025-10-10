import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPassword, login, resetPassword } from "../../services/authServices";

export const loginThunk = createAsyncThunk("auth/login", async (body, { rejectWithValue }) => {
  try {
    const response = await login(body);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message || "Login Failed");
  }
});

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
