import { useState, useEffect } from "react";
import DataTable from "../components/DataTable/SalaryDataTable.jsx";
import FormModal from "../components/FormModal/SalaryFormModal.jsx";
import { Button } from "../components/ui/button.jsx";
import { Plus } from "lucide-react";
import {
  getAllSalarySlip,
  createSalarySlip,
  // updateEmployer,
  // deleteEmployer,
} from "../utils/salary-slip-api.js";
import { getAllEmployers } from "../utils/client-api.js";

const Container = () => {
  const [items, setItems] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [fileData, setFileData] = useState([]);
  // const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const [salaryData, employerData] = await Promise.all([
        getAllSalarySlip(),
        getAllEmployers(),
      ]);
      setItems(salaryData.slips  || []);
      setEmployers(employerData?.users || []);
    } catch (error) {
      console.error("Error loading items:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createSalarySlip(formData);
      await loadItems();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating salary slip:", error.message);
    }
  };

  // const handleUpdate = async (_id, formData) => {
  //   console.log("handleUpdate:", _id);
  //   for (let pair of formData.entries()) {
  //     console.log(pair[0] + ": " + pair[1]);
  //   }

  //   try {
  //     await updateEmployer(_id, formData); // ✅ formData bhejna hai
  //     await loadItems();
  //     setIsModalOpen(false);
  //     setCurrentItem(null);
  //   } catch (error) {
  //     console.error("Error updating item:", error.message);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     await deleteEmployer(id);
  //     await loadItems();
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };

  // const openEditModal = (item) => {
  //   setCurrentItem(item);
  //   setIsModalOpen(true);
  // };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Salary Slip</h1>
        {/* <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
        
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> UPLOAD
        </Button>
      </div>

      <DataTable
        data={items}
        loading={isLoading}
        // onEdit={openEditModal}
        // onDelete={handleDelete}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
        employers={employers}
      />
    </div>
  );
};

export default Container;
