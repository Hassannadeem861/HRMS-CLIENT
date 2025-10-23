import Api from "../services/axios";
import { toast } from "react-hot-toast";

export const getAllLoans = async () => {
  try {
    const res = await Api.get("/api/v1/get-all-loans");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to load loans.");
    return null;
  }
};

export const createLoan = async (data) => {
  try {
    const res = await Api.post("/api/v1/create-loan", data);
    toast.success("Loan created successfully!");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create loan.");
    return null;
  }
};

export const updateLoan = async (id, data) => {
  try {
    const res = await Api.put(`/api/v1/update-loan/${id}`, data);
    toast.success("Loan updated successfully!");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update loan.");
    return null;
  }
};

export const deleteLoan = async (id) => {
  try {
    const res = await Api.delete(`/api/v1/delete-loan/${id}`);
    toast.success("Loan deleted successfully!");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete loan.");
    return null;
  }
};
