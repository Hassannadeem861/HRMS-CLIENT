import Api from "../services/axios";
import { toast } from "react-hot-toast";

export const getAllOfficeTimes = async () => {
  try {
    const res = await Api.get("/api/v1/get-all-office-times");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to load records.");
    return null;
  }
};

export const createOfficeTime = async (data) => {
  try {
    const res = await Api.post("/api/v1/create-office-time", data);
    toast.success("Office Time created successfully!");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create record.");
    return null;
  }
};

export const updateOfficeTime = async (id, data) => {
  try {
    const res = await Api.put(`/api/v1/update-office-time/${id}`, data);
    toast.success("Office Time updated successfully!");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update record.");
    return null;
  }
};

export const deleteOfficeTime = async (id) => {
  try {
    const res = await Api.delete(`/api/v1/delete-office-time/${id}`);
    toast.success("Office Time deleted successfully!");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete record.");
    return null;
  }
};
