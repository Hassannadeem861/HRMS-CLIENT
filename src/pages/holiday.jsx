import { useState, useEffect } from "react";
import { Button } from "../components/ui/button.jsx";
import { Plus } from "lucide-react";
import {
  getAllHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from "../utils/holiday-api.js";
import HolidayDataTable from "../components/DataTable/HolidayDataTable.jsx";
import HolidayFormModal from "../components/FormModal/HolidayFormModal.jsx";

const Holiday = () => {
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
      const data = await getAllHolidays();
      setItems(data?.holidays || []);
    } catch (error) {
      console.error("Error loading holidays:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editItem) {
        await updateHoliday(editItem._id, formData);
      } else {
        await createHoliday(formData);
    }
    await loadItems();
    setEditItem(null);
    setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving holiday:", error.message);
    }
  };

  const handleDelete = async (holidayId) => {
    try {
      await deleteHoliday(holidayId);
      await loadItems();
    } catch (error) {
      console.error("Error deleting holiday:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Holidays</h1>
        <Button
          onClick={() => {
            setEditItem(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> ADD HOLIDAY
        </Button>
      </div>

      <HolidayDataTable
        data={items}
        loading={isLoading}
        onEdit={(item) => {
          setEditItem(item);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <HolidayFormModal
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

export default Holiday;
