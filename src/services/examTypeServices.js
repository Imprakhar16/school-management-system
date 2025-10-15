import React from "react";
import { axiosInstance } from "../helper/axiosInterceptors";
import { showToast } from "../components/toaster";
import API_PATHS from "./apiEndpoints";

export const examTypeList = async ({ page, limit }) => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.EXAMINATION.EXAMTYPE_LIST}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (err) {
    showToast({
      message: err.response?.data?.message || "Fetch exam type failed",
      status: "error",
    });
  }
};

export const createExamType = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.EXAMINATION.CREATE_EXAMTYPE, body);
    return response.data;
  } catch (err) {
    showToast({
      message: err.response?.data?.message || "Create exam type failed",
      status: "error",
    });
  }
};

export const updateExamType = async (id, update) => {
  try {
    const response = await axiosInstance.put(
      `${API_PATHS.EXAMINATION.UPDATE_EXAMTYPE}/${id}`,
      update
    );
    return response.data;
  } catch (err) {
    showToast({
      message: err.response?.data?.message || "Update exam type failed",
      status: "error",
    });
  }
};
