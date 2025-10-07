import React from "react";
import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";
import { showToast } from "../components/toaster";

export const fetchStudent = async ({ page, limit, search }) => {
  const response = await axiosInstance.get(
    `${API_PATHS.STUDENT.ALL_STUDENTS}?page=${page}&limit=${limit}&search${search}`
  );
  return response;
};

export const createStudentService = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.STUDENT.CREATE_STUDENT, body);
    return response.data;
  } catch (err) {
    showToast({
      status: "error",
      message: err.message || "Failed creating student",
    });
  }
};
