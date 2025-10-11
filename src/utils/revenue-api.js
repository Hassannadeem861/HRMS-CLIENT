import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllRevenues = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-revenues`);
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in get all revenues");
  }
};

export const createRevenue = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-revenue`, itemData);
    toast.success("Revenue created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in create revenue");
  }
};

export const updateRevenue = async (_id, itemData) => {
  try {
    const response = await Api.put(`/api/v1/update-revenue/${_id}`, itemData);
    toast.success("Revenue updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in update revenue");
  }
};

export const deleteRevenue = async (_id) => {
  try {
    const response = await Api.delete(`/api/v1/delete-revenue/${_id}`);
    toast.success("Revenue deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in delete revenue");
  }
};
