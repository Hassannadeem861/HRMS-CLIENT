import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllHolidays = async () => {
  try {
    const response = await Api.get(`/api/v1/get-holidays`);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to get holidays.");
  }
};

export const createHoliday = async (holidayData) => {
  try {
    const response = await Api.post(`/api/v1/create-holiday`, holidayData);
    toast.success("Holiday created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create holiday.");
    return null;
  }
};

export const updateHoliday = async (holidayId, holidayData) => {
  try {
    const response = await Api.put(
      `/api/v1/update-holiday/${holidayId}`,
      holidayData
    );
    toast.success("Holiday updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update holiday.");
    return null;
  }
};

export const deleteHoliday = async (holidayId) => {
  try {
    const response = await Api.delete(`/api/v1/delete-holiday/${holidayId}`);
    toast.success("Holiday deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete holiday.");
    return null;
  }
};
