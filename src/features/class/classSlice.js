import { createSlice } from "@reduxjs/toolkit";
import { classListThunk, createClassThunk, deleteClassThunk, editClassThunk } from "./classThunk";

const initialState = {
  classes: [],
  loading: null,
  error: null,
  totalCount: null,
  totalPages: null,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //FetchThunk:-
      .addCase(classListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(classListThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload.classes;
        state.totalCount = action.payload.meta.totalClasses || 0;
        state.totalPages = action.payload.meta.totalPages || 0;
      })
      .addCase(classListThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      //CreateThunk:-
      .addCase(createClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.classes.push(action.payload);
      })
      .addCase(createClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      //EditThunk:-
      .addCase(editClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedClass = action.payload;
        const index = state.classes.findIndex((c) => c._id === updatedClass._id);
        if (index !== -1) state.classes[index] = updatedClass;
      })
      .addCase(editClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      //DeleteThunk:-
      .addCase(deleteClassThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClassThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = state.classes.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteClassThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default classSlice.reducer;
