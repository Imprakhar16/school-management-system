import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";
import { showToast } from "../components/toaster";

export const fetchStudent = async (page, limit, filters = {}) => {
  const params = { page, limit, ...filters };

  Object.keys(params).forEach((key) => {
    if (params[key] === "" || params[key] === undefined) {
      delete params[key];
    }
  });

  const response = await axiosInstance.get(`${API_PATHS.STUDENT.ALL_STUDENTS}`, { params });
  return response.data;
};

export const fetchStudentById = async (id) => {
  const response = await axiosInstance.get(`${API_PATHS.STUDENT.STUDENTS_BY_ID}/${id}`);
  return response.data;
};

export const createStudentService = async (formData) => {
  try {
    const response = await axiosInstance.post(API_PATHS.STUDENT.CREATE_STUDENT, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    showToast({
      status: "error",
      message: err.response?.data?.message || "Failed creating student",
    });
  }
};

export const editStudentService = async (id, update) => {
  try {
    const response = await axiosInstance.put(`${API_PATHS.STUDENT.UPDATE_STUDENT}/${id}`, update, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    showToast({
      status: "error",
      message: error.response?.data?.message || "Failed Updating student",
    });
  }
};

export const deleteStudentService = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_PATHS.STUDENT.DELETE_STUDENT}/${id}`);
    return response.data;
  } catch (err) {
    showToast({
      status: "error",
      message: err.response?.data?.message || "Failed deleting student",
    });
  }
};
