import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllRemotes = async () => {
  try {
    const response = await Api.get(`/api/v1/get-remote`);
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to get remotes.");
  }
};

export const createRemote = async (remoteData) => {
  try {
    const response = await Api.post(`/api/v1/create-remote`, remoteData);
    toast.success("Remote entry created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create remote.");
    return null;
  }
};

export const updateRemote = async (remoteId, remoteData) => {
  try {
    const response = await Api.put(`/api/v1/update-remote/${remoteId}`, remoteData);
    toast.success("Remote updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update remote.");
    return null;
  }
};

export const deleteRemote = async (remoteId) => {
  try {
    const response = await Api.delete(`/api/v1/delete-remote/${remoteId}`);
    toast.success("Remote deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete remote.");
    return null;
  }
};
