import React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { examTypeList, createExamType, updateExamType } from "../../services/examTypeServices";

export const getExamTypeThunk = createAsyncThunk(
  "examType/getExamTypeList",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await examTypeList({ page, limit });
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createExamTypeThunk = createAsyncThunk(
  "examType/createExamType",
  async (body, { rejectWithValue }) => {
    try {
      const response = await createExamType(body);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateExamTypeThunk = createAsyncThunk(
  "examType/updateExamType",
  async ({ id, update }, { rejectWithValue }) => {
    try {
      const response = await updateExamType(id, update);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
