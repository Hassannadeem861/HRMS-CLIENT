import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllProjects = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-projects`);
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in get all employers");
    console.error("Error fetching projects:", error.message);
  }
};

export const createProject = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-project`, itemData);
    toast.success("Project created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in create employer");
    console.error("Error creating project:", error.message);
  }
};

export const updateProject = async (_id, itemData) => {
  try {
    const response = await Api.put(`/api/v1/update-project/${_id}`, itemData);
    toast.success("Project updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in update project");
  }
};

export const deleteProject = async (_id) => {
  try {
    const response = await Api.delete(`/api/v1/delete-project/${_id}`);
    toast.success("Project deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in delete project");
  }
};
