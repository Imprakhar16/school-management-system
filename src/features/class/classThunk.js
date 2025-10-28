import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createClass,
  classList,
  editClass,
  deleteClass,
  classDetail,
} from "../../services/classServices";

export const classListThunk = createAsyncThunk(
  "class/classList",
  async ({ page, limit, search }, { rejectWithValue }) => {
    try {
      const response = await classList(page, limit, search);
      return response;
    } catch (err) {
      return rejectWithValue("class Fetch Failed", err);
    }
  }
);

export const classDetailThunk = createAsyncThunk(
  "class/classDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await classDetail(id);
      return response;
    } catch (err) {
      return rejectWithValue("Class detail fetch failed", err);
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
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteClassThunk = createAsyncThunk(
  "class/deleteClass",
  async (id, { rejectWithValue }) => {
    try {
      await deleteClass(id);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
