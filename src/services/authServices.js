import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";

export const loginPrincipal = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, body);
    localStorage.setItem("authToken", response.data.token);
    showToast({
      message: `Welcome Back ${response.data.user.role}😄`,
      status: "success",
    });
    return response;
  } catch (error) {
    const message = error.response?.data?.message || "Login Failed";

    if (message === "Incorrect password") {
      showToast({
        message: "Invalid Credentials 😞",
        status: "error",
      });
    } else if (message === "User not found") {
      showToast({
        message: "You are trying to login as pricipal , Please login as diffrent module.",
        status: "error",
      });
    } else {
      showToast({
        message: "Login Failed 😞",
        status: "error",
      });
    }

    throw error;
  }
};

export const loginTeacher = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN_TEACHER, body);
    localStorage.setItem("authToken", response.data.token);
    showToast({
      message: `Welcome Back ${response.data.teacher.firstname} (Teacher)😄`,
      status: "success",
    });
    return response;
  } catch (error) {
    const message = error.response?.data?.message || "Login Failed";
    if (message === "Incorrect password") {
      showToast({
        message: "Invalid Credentials 😞",
        status: "error",
      });
    } else if (message === "teacher not found") {
      showToast({
        message: "You are not a Teacher !!! 😞",
        status: "error",
      });
    } else {
      showToast({
        message: "Login Failed",
        status: "error",
      });
    }
    throw error;
  }
};
export const loginStudent = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN_STUDENT, body);
    localStorage.setItem("authToken", response.data.token);
    showToast({
      message: `Welcome Back ${response.data.student.firstname} (Student)😄`,
      status: "success",
    });
    return response;
  } catch (error) {
    const message = error.response?.data?.message || "Login Failed";
    if (message === "Incorrect password") {
      showToast({
        message: "Invalid Credentials 😞",
        status: "error",
      });
    } else if (message === "student not found") {
      showToast({
        message: "You are not a Student !!! 😞",
        status: "error",
      });
    } else {
      showToast({
        message: "Login Failed 😞",
        status: "error",
      });
    }
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, email);
    showToast({
      message: `${response.data.message}`,
      status: "success",
    });
    return response;
  } catch (error) {
    showToast({
      message: `${error.message}`,
      status: "error",
    });
  }
};

export const resetPassword = async (credentials) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, credentials);
    showToast({
      message: `${response.data.message}`,
      status: "success",
    });
    return response.data;
  } catch (error) {
    showToast({
      message: `${error.message}`,
      status: "error",
    });
  }
};
