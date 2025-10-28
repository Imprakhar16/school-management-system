// import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";

export const createExam = async () => {
  const response = await axiosInstance.post(API_PATHS.EXAMINATION.CREATE);
  return response.data;
};
