import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/authServices";

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
