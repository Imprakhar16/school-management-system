import React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStudent, createStudentService } from "../../services/studentServices";

export const fetchStudentThunk = createAsyncThunk(
  "student/fetchStudent",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await fetchStudent(page, limit);
      return response;
    } catch (err) {
      return rejectWithValue("Students Fetch failed", err);
    }
  }
);

export const createStudentThunk = createAsyncThunk(
  "student/createStudent",
  async (body, { rejectWithValue }) => {
    try {
      const response = await createStudentService(body);
      return response;
    } catch (err) {
      return rejectWithValue("Students create failed", err);
    }
  }
);
