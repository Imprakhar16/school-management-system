import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";

export const loginUser = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, body);
    localStorage.setItem("authToken", JSON.stringify(response.data.token));
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
