import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllLeaves = async () => {
  try {
    const response = await Api.get(`/api/v1/get-leaves`);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to get leaves.");
  }
};

export const createLeave = async (leaveData) => {
  try {
    const response = await Api.post(`/api/v1/create-leave`, leaveData);
    toast.success("Leave created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create leave.");
    return null;
  }
};

export const updateLeave = async (leaveId, leaveData) => {
  try {
    const response = await Api.put(`/api/v1/update-leave/${leaveId}`, leaveData);
    toast.success("Leave updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update leave.");
    return null;
  }
};

export const deleteLeave = async (leaveId) => {
  try {
    const response = await Api.delete(`/api/v1/delete-leave/${leaveId}`);
    toast.success("Leave deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete leave.");
    return null;
  }
};
