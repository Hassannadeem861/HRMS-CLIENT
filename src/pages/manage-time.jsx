import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import {
  getAllOfficeTimes,
  createOfficeTime,
  updateOfficeTime,
  deleteOfficeTime,
} from "../utils/manage-office-time.js";
import OfficeTimeDataTable from "../components/DataTable/DataTable/OfficeTimeDataTable.jsx";
import OfficeTimeFormModal from "../components/FormModal/OfficeTimeFormModal.jsx";

const ManageOfficeTime = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    loadOfficeTimes();
  }, []);

  const loadOfficeTimes = async () => {
    setLoading(true);
    const data = await getAllOfficeTimes();
    setItems(data?.getAllOfficeTimes || []);
    setLoading(false);
  };

  const handleSubmit = async (formData) => {
    if (editItem) {
      await updateOfficeTime(editItem._id, formData);
    } else {
      await createOfficeTime(formData);
    }
    await loadOfficeTimes();
    setModalOpen(false);
    setEditItem(null);
  };

  const handleDelete = async (id) => {
    await deleteOfficeTime(id);
    await loadOfficeTimes();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Office Time</h1>
        <Button
          onClick={() => {
            setEditItem(null);
            setModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Office Time
        </Button>
      </div>

      <OfficeTimeDataTable
        data={items}
        loading={loading}
        onEdit={(item) => {
          setEditItem(item);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <OfficeTimeFormModal
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

export default ManageOfficeTime;
