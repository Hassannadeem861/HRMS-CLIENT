import { useState, useEffect } from "react";
import { Button } from "../components/ui/button.jsx";
import { Plus } from "lucide-react";
import {
  getAllLeaves,
  createLeave,
  updateLeave,
  deleteLeave,
} from "../utils/leave-api.js";
import LeaveDataTable from "../components/DataTable/LeaveDataTable.jsx";
import LeaveFormModal from "../components/FormModal/LeaveFromModel.jsx";

const Leave = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const data = await getAllLeaves();
      setItems(data?.leaves || []);
    } catch (error) {
      console.error("Error loading leaves:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editItem) {
        await updateLeave(editItem._id, formData);
      } else {
        await createLeave(formData);
      }
      await loadItems();
      setEditItem(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving leave:", error.message);
    }
  };

  const handleDelete = async (leaveId) => {
    try {
      await deleteLeave(leaveId);
      await loadItems();
    } catch (error) {
      console.error("Error deleting leave:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leaves</h1>
        <Button
          onClick={() => {
            setEditItem(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> ADD LEAVE
        </Button>
      </div>

      <LeaveDataTable
        data={items}
        loading={isLoading}
        onEdit={(item) => {
          setEditItem(item);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <LeaveFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditItem(null);
        }}
        onSubmit={handleCreateOrUpdate}
        defaultValues={editItem}
      />
    </div>
  );
};

export default Leave;
