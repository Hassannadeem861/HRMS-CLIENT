import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllExpences = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-expences`);
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in get all expences");
  }
};

export const createExpence = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-expence`, itemData);
    toast.success("Expence created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in create expence");
    console.error("Error creating project:", error.message);
  }
};

export const updateExpence = async (_id, itemData) => {
  try {
    const response = await Api.put(`/api/v1/update-expence/${_id}`, itemData);
    toast.success("Expence updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in update expence");
  }
};

export const deleteExpence = async (_id) => {
  try {
    const response = await Api.delete(`/api/v1/delete-expence/${_id}`);
    toast.success("Expence deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in delete expence");
  }
};
