import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";

export const createSubject = async (body) => {
  const response = await axiosInstance.post(API_PATHS.SUBJECT.CREATE_SUBJECT, body);
  return response.data;
};

// Fetch all subjects
export const fetchAllSubjects = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.SUBJECT.ALL_SUBJECTS);
    return response.data;
  } catch (error) {
    console.error("❌ Fetch subjects error:", error.response?.data || error);
    throw error.response?.data || error;
  }
};
