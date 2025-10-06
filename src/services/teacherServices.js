import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";

//TEACHER LOGIN --->
export const loginTeacher = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.TEACHER.LOGIN, body);

    // Save token in localStorage
    localStorage.setItem("authToken", JSON.stringify(response.data.token));

    // Success toast
    showToast({
      message: `Welcome Back ${response.data.teacher?.firstName || "Teacher"}`,
      status: "success",
    });

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message === "Password incorrect"
        ? "Invalid Credentials"
        : error.response?.data?.message || "Teacher Login Failed";

    showToast({
      message,
      status: "error",
    });

    throw error.response?.data || error;
  }
};

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
