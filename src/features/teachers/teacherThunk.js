import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllTeachers,
  registerTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacher,
} from "../../services/teacherServices";

//Register
export const registerTeacherThunk = createAsyncThunk(
  "teacher/registerTeacher",
  async (body, { rejectWithValue }) => {
    try {
      const data = await registerTeacher(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Teacher registration failed");
    }
  }
);

//Fetch All Tearchers
export const fetchAllTeachersThunk = createAsyncThunk(
  "subject/fetchAllTeachers",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await fetchAllTeachers({ page, limit, search });

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch subjects"
      );
    }
  }
);

// Get teacher
export const getTeacherThunk = createAsyncThunk(
  "teacher/getTeacher",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getTeacher(id);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to get teacher"
      );
    }
  }
);

// Update Teacher
export const updateTeacherThunk = createAsyncThunk(
  "teacher/updateTeacher",
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const data = await updateTeacher(id, body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update teacher");
    }
  }
);

// Delete Teacher
export const deleteTeacherThunk = createAsyncThunk(
  "teacher/deleteTeacher",
  async (id, { rejectWithValue }) => {
    try {
      const data = await deleteTeacher(id);
      return { id, ...data };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete teacher");
    }
  }
);
