import Api from "../services/axios.js";

export const getAllUsers = async () => {
  const response = await Api.get(`/api/v1/get-all-users`);
  return response?.data;
  
};

export const signup = async (itemData) => {
  const response = await Api.post(`/api/v1/signup`, itemData);
  return response?.data;
};

export const loginUser = async (itemData) => {
  const response = await Api.post(`/api/v1/login`, itemData);
  return response?.data;
};

export const logoutUser = async () => {
  const response = await Api.post(`/api/v1/logout`);
  return response?.data;
};

export const updateUser = async (id, itemData) => {
  const response = await Api.put(`/api/v1/update-client/${id}`, itemData);
  return response?.data;
};

export const deleteDelete = async (id) => {
  const response = await Api.delete(`/api/v1/delete-client/${id}`);
  return response?.data;
};
