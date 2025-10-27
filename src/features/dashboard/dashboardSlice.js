import { createSlice } from "@reduxjs/toolkit";
import { dashboardThunk } from "./dashboardThunk";

const initialState = {
  data: {
    classes: { total: 0 },
    students: { total: 0, active: 0 },
    teachers: { total: 0, active: 0 },
  },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(dashboardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dashboardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(dashboardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default dashboardSlice.reducer;
