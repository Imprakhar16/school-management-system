import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDashboardData } from "../../services/dashboardServices";

export const dashboardThunk = createAsyncThunk(
  "dashboard/getAllData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllDashboardData();
      return response.data;
    } catch (error) {
      return rejectWithValue("fetching dashboard Failed", error);
    }
  }
);
