import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";

export const loginUser = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, body);
    localStorage.setItem("authToken", response.data.token);
    showToast({
      message: `Welcome Back ${response.data.user.firstName}`,
      status: "success",
    });
    return response;
  } catch (error) {
    if (error.response.data.message === "Password incorrect") {
      showToast({
        message: "Invalid Credentials",
        status: "error",
      });
    } else {
      showToast({
        message: "Login Failled",
        status: "error",
      });
    }
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
