import { createAsyncThunk } from "@reduxjs/toolkit";
import { createClass, classList, editClass, deleteClass } from "../../services/classServices";

export const classListThunk = createAsyncThunk(
  "class/classList",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await classList({ page, limit });
      return response;
    } catch (err) {
      return rejectWithValue("class Fetch Failed", err);
    }
  }
);

export const createClassThunk = createAsyncThunk(
  "class/createClass",
  async (body, { rejectWithValue }) => {
    try {
      const response = await createClass(body);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editClassThunk = createAsyncThunk(
  "class/editClass",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await editClass(id, data);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteClassThunk = createAsyncThunk(
  "class/deleteClass",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteClass(id);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
