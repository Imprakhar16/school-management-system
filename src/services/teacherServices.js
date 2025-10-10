import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";

//TEACHER REGISTRATION --->
export const registerTeacher = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.TEACHER.REGISTER, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    showToast({
      message: `Teacher ${response.data.teacher?.firstname || body.get("firstname")} registered successfully!`,
      status: "success",
    });

    return response.data;
  } catch (error) {
    showToast({
      message: error.response?.data?.message || "Teacher Registration Failed",
      status: "error",
    });

    throw error.response?.data || error;
  }
};

// fetch all teachers -->
export const fetchAllTeachers = async ({ page, limit, search }) => {
  try {
    const params = { page, limit };
    if (search) params.search = search;
    const response = await axiosInstance.get(API_PATHS.TEACHER.ALL_TEACHERS, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// UPDATE TEACHER
export const updateTeacher = async (id, body) => {
  try {
    const response = await axiosInstance.put(`${API_PATHS.TEACHER.UPDATE_TEACHER}/${id}`, body, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    showToast({
      message: `Teacher ${response.data.teacher?.firstname || body.get("firstname")} updated successfully!`,
      status: "success",
    });

    return response.data;
  } catch (error) {
    showToast({
      message: error.response?.data?.message || "Teacher Update Failed",
      status: "error",
    });
    throw error.response?.data || error;
  }
};

// DELETE TEACHER
export const deleteTeacher = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_PATHS.TEACHER.DELETE_TEACHER}/${id}`);
    showToast({
      message: `Teacher deleted successfully!`,
      status: "success",
    });
    return response.data;
  } catch (error) {
    showToast({
      message: error.response?.data?.message || "Teacher Deletion Failed",
      status: "error",
    });
    throw error.response?.data || error;
  }
};
