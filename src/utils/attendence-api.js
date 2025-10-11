import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllAttendence = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-attendance`);
    return response?.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to get all attendence."
    );
  }
};

export const createAttendence = async (file) => {
  try {
    const formData = new FormData();
    formData.append("excelFile", file); // 👈 backend ke liye exact field name

    const response = await Api.post(`/api/v1/upload-attendance`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Attendence created successfully!");
    return response?.data;
  } catch (error) {
    console.error("Error in creating attendence:", error.message);
    toast.error(
      error?.response?.data?.message || "Failed to create attendence."
    );
    return null;
  }
};

export const getSingleAttendence = async (empNo, month, year) => {
  try {
    const response = await Api.get(
      `/api/v1/get-single-attendance/${empNo}?month=${month}&year=${year}`
    );
    return response?.data;
  } catch (error) {
    console.error("Error in getting single attendance:", error.message);
    toast.error(
      error?.response?.data?.message || "Failed to get single attendance."
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
