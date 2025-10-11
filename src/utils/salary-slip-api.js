import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllSalarySlip = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-salary-slip`);
    return response?.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to get all salary slips."
    );
  }
};

export const createSalarySlip = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-salary-slip`, itemData);
    toast.success("Salary slip created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to create salary slip."
    );
    return null;
  }
};

// export const updateEmployer = async (_id, itemData) => {
//   console.log("updateEmployer: ", _id);
//   console.log("itemData: ", itemData);

//   const response = await Api.put(`/api/v1/update-employer/${_id}`, itemData);
//   console.log("Update response: ", response?.data);

//   return response?.data;
// };

// export const deleteEmployer = async (_id) => {
//   const response = await Api.delete(`/api/v1/delete-employer/${_id}`);
//   return response?.data;
// };
