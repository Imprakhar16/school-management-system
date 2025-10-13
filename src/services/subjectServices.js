import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";
import { showToast } from "../components/toaster";

// Create subject -->
export const createSubject = async (body) => {
  try {
    const response = await axiosInstance.post(API_PATHS.SUBJECT.CREATE_SUBJECT, body);
    showToast({
      message: "Subject Created",
      status: "success",
    });
    return response.data;
  } catch (error) {
    showToast({
      message: error.response.data.message || "Failed to create subjects",
      status: "error",
    });
  }
};

// Fetch all subjects --->
export const fetchAllSubjects = async ({ page, limit, search }) => {
  try {
    const params = { page, limit };
    if (search) params.search = search;

    const response = await axiosInstance.get(API_PATHS.SUBJECT.ALL_SUBJECTS, { params });
    return response.data;
  } catch (error) {
    showToast({
      message: error.response.data.message || "Failed to fetch subjects",
      status: "error",
    });
    throw error.response?.data || error;
  }
};

// Delete subject by ID --->
export const deleteSubject = async (_id) => {
  try {
    const response = await axiosInstance.delete(`${API_PATHS.SUBJECT.DELETE_SUBJECT}/${_id}`);
    showToast({
      message: "Subject deleted successfully",
      status: "success",
    });
    return response.data;
  } catch (error) {
    showToast({
      message: error.response.data.message || "Failed to delete subject",
      status: "error",
    });
    throw error.response?.data || error;
  }
};

// Update subject --->
export const updateSubject = async (_id, updatedData) => {
  try {
    const response = await axiosInstance.put(
      `${API_PATHS.SUBJECT.UPDATE_SUBJECT}/${_id}`,
      updatedData
    );
    console.log("service--->", response.data);
    showToast({
      message: "Subject updated successfully",
      status: "success",
    });
    return response.data;
  } catch (error) {
    showToast({
      message: error.response.data.message || "Failed to update subject",
      status: "error",
    });
    throw error.response?.data || new Error(error.message || "Failed to update subject");
  }
};
