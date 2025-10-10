import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";

const fetchSections = async ({ page, limit, search }) => {
  try {
    const response = await axiosInstance.get(API_PATHS.SECTION.GET, {
      params: { page, limit, search },
    });
    return response.data;
  } catch (error) {
    const message = error.response.data.message;

    if (message === "Token Expired") {
      showToast({
        status: "error",
        message: "Token is expired,Please login",
      });
    } else {
      showToast({
        status: "error",
        message: "Can't fetch sections",
      });
    }
  }
};

const createSection = async (data) => {
  try {
    const response = await axiosInstance.post(API_PATHS.SECTION.CREATE, data);
    return response.data;
  } catch (error) {
    if (error.response.data.message === "sectionId already exist") {
      showToast({
        status: "error",
        message: "Section already exist!",
      });
    } else {
      showToast({
        status: "error",
        message: "Failed Creating Section",
      });
    }
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
    if (error.response.data.message === "section already exist") {
      showToast({
        status: "error",
        message: "Section Already Found, Please Enter a diffrent Section.",
      });
    } else {
      showToast({
        status: "error",
        message: "Failed updating section",
      });
    }
  }
};

export default {
  fetchSections,
  createSection,
  deleteSection,
  updateSection,
};
