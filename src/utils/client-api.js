import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllEmployers = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-employers`);
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in get all employers");
    console.error("Error fetching employers:", error.message);
  }
};

export const createEmployer = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-employer`, itemData);
    toast.success("Employer created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in create employer");
    console.error("Error creating employer:", error.message);
  }
};

export const updateEmployer = async (_id, itemData) => {
  try {
    const response = await Api.put(`/api/v1/update-employer/${_id}`, itemData);
    toast.success("Employer updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in update employer");
  }
};

export const deleteEmployer = async (_id) => {
  try {
    const response = await Api.delete(`/api/v1/delete-employer/${_id}`);
    toast.success("Employer deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in delete employer");
    console.error("Error deleting employer:", error.message);
  }
};
