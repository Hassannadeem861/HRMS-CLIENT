import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import {
  getAllLoans,
  createLoan,
  updateLoan,
  deleteLoan,
} from "../utils/loan-api.js";
import LoanDataTable from "../components/DataTable/DataTable/OfficeLoanDataTable.jsx";
import LoanFormModal from "../components/FormModal/LoanFormModal.jsx";
import Loader from "../components/loader.jsx";
const ManageLoan = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      setLoading(true);
      const data = await getAllLoans();
      setItems(data?.getAllOfficeTimes || []);
      setLoading(false);
    } catch (error) {
      console.log("Error in get all office loans", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (editItem) {
        await updateLoan(editItem._id, formData);
      } else {
        await createLoan(formData);
      }
      await loadLoans();
      setModalOpen(false);
      setEditItem(null);
    } catch (error) {
      console.log("Error in create office loans", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteLoan(id);
    await loadLoans();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Loan</h1>
        <Button
          onClick={() => {
            setEditItem(null);
            setModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Loan
        </Button>
      </div>

      <LoanDataTable
        data={items}
        loading={loading}
        onEdit={(item) => {
          setEditItem(item);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <LoanFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditItem(null);
        }}
        onSubmit={handleSubmit}
        defaultValues={editItem}
      />
    </div>
  );
};

export default ManageLoan;
