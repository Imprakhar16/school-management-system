import { showToast } from "../components/toaster";
import { axiosInstance } from "../helper/axiosInterceptors";
import API_PATHS from "./apiEndpoints";

export const classList = async (page, limit, search = {}) => {
  try {
    const params = { page, limit, ...search };

    Object.keys(params).forEach((key) => {
      if (params[key] === "" || params[key] === undefined) {
        delete params[key];
      }
    });

    const response = await axiosInstance.get(`${API_PATHS.ClASS.CLASS_LIST}`, { params });
    return response.data;
  } catch (err) {
    showToast({
      message: err.response?.data?.message || "Fetch class failed",
      status: "error",
    });
  }
};

export const classDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`${API_PATHS.ClASS.CLASS_BY_ID}/${id}`);
    return response.data;
  } catch (err) {
    showToast({
      message: err.response?.data?.message || "Fetch class detail failed",
      status: "error",
    });
  }
};

export const createClass = async (body) => {
  try {
    const response = await axiosInstance.post(`${API_PATHS.ClASS.CREATE_CLASS}`, body);
    showToast({
      message: "Class added",
      status: "success",
    });
    return response.data;
  } catch (err) {
    showToast({
      message: err.response?.data?.message || "Class create failed",
      status: "error",
    });
  }
};

export const editClass = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${API_PATHS.ClASS.EDIT_CLASS}/${id}`, data);
    showToast({
      message: "Update Successfully",
      status: "success",
    });
    return response.data;
  } catch (err) {
    showToast({
      status: "error",
      message: err.message || "Failed updating section",
    });
  }
};

export const deleteClass = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_PATHS.ClASS.DELETE_CLASS}/${id}`);
    showToast({
      message: "Delete successfully",
      status: "success",
    });
    return response.data;
  } catch (err) {
    showToast({
      message: err.response?.data?.message || "Delete class failed",
      status: "error",
    });
  }
};
