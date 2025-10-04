import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";

const fetchSections = async ({ page, limit, search }) => {
  const response = await axiosInstance.get(API_PATHS.SECTION.GET, {
    params: { page, limit, search },
  });
  return response.data;
};

const createSection = async (data) => {
  try {
    const response = await axiosInstance.post(API_PATHS.SECTION.CREATE, data);
    return response.data;
  } catch (error) {
    showToast({
      status: "error",
      message: error.message || "Failed Creating Section",
    });
  }
};

const deleteSection = async (sectionId) => {
  const response = await axiosInstance.delete(`${API_PATHS.SECTION.DELETE}/${sectionId}`);
  return response.data;
};
export const updateSection = async ({ sectionId, data }) => {
  try {
    const response = await axiosInstance.put(`${API_PATHS.SECTION.UPDATE}/${sectionId}`, data);
    return response.data;
  } catch (error) {
    showToast({
      status: "error",
      message: error?.response?.data?.message || "Failed updating section",
    });
    throw error;
  }
};

export default {
  fetchSections,
  createSection,
  deleteSection,
  updateSection,
};
