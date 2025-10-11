import { useState, useEffect } from "react";
import { Button } from "../components/ui/button.jsx";
import { Plus } from "lucide-react";
import {
  getAllRemotes,
  createRemote,
  updateRemote,
  deleteRemote,
} from "../utils/remote-api.js";
import RemoteDataTable from "../components/DataTable/RemoteDataTable.jsx";
import RemoteFormModal from "../components/FormModal/RemoteFormModal.jsx";

const Remote = () => {
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
      const data = await getAllRemotes();
      setItems(data?.remote || []); // ✅ match backend response key
    } catch (error) {
      console.error("Error loading remotes:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editItem) {
        await updateRemote(editItem._id, formData);
      } else {
        await createRemote(formData);
      }
      await loadItems();
      setEditItem(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving remote:", error.message);
    }
  };

  const handleDelete = async (remoteId) => {
    try {
      await deleteRemote(remoteId);
      await loadItems();
    } catch (error) {
      console.error("Error deleting remote:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Remote Work</h1>
        <Button
          onClick={() => {
            setEditItem(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> ADD REMOTE
        </Button>
      </div>

      <RemoteDataTable
        data={items}
        loading={isLoading}
        onEdit={(item) => {
          setEditItem(item);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <RemoteFormModal
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

export default Remote;
