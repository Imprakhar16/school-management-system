import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";

export const getAllDashboardData = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/all");
    return response.data;
  } catch (error) {
    showToast({
      message: error.response?.data?.message || "Fetch Dashboard Data failed",
      status: "error",
    });
  }
};
