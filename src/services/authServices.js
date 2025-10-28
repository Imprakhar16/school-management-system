import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";

export const login = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, body);
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("role", response.data.user.role);
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
    } else if (message === "No account found with this email") {
      showToast({
        message: "No Account Found 😞",
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
