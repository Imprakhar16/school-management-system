import React from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchStudent,
  createStudentService,
  editStudentService,
  deleteStudentService,
  fetchStudentById,
} from "../../services/studentServices";

export const fetchStudentThunk = createAsyncThunk(
  "student/fetchStudent",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await fetchStudent(page, limit, search);
      return response;
    } catch (err) {
      return rejectWithValue("Students Fetch failed", err);
    }
  }
);

export const fetchStudentByIdThunk = createAsyncThunk(
  "student/fetchStudentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchStudentById(id);
      return response;
    } catch (err) {
      return rejectWithValue("Student fetch failed", err);
    }
  }
);

export const createStudentThunk = createAsyncThunk(
  "student/createStudent",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createStudentService(formData);
      return response;
    } catch (err) {
      return rejectWithValue("Students create failed", err);
    }
  }
);

export const editStudentThunk = createAsyncThunk(
  "student/editStudent",
  async ({ id, update }, { rejectWithValue }) => {
    try {
      const response = await editStudentService(id, update);
      return response;
    } catch (err) {
      return rejectWithValue("Students update failed", err);
    }
  }
);

export const deleteStudentThunk = createAsyncThunk(
  "student/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      await deleteStudentService(id);
      return id;
    } catch (err) {
      return rejectWithValue("Students delete failed", err);
    }
  }
);
