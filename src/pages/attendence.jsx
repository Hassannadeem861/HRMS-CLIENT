import { useState, useEffect } from "react";
import DataTable from "../components/DataTable/AttendenceDataTable.jsx";
import { Button } from "../components/ui/button.jsx";
import { Plus } from "lucide-react";
import { getAllAttendence, createAttendence } from "../utils/attendence-api.js";
import AttendenceFormModal from "../components/FormModal/AttendenceFormModal.jsx";

const Attendence = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const data = await getAllAttendence();
      setItems(data?.records || []);
    } catch (error) {
      console.error("Error loading items:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);
  
  const handleCreate = async (file) => {
    try {
      await createAttendence(file);
      await loadItems();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating attendance:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> UPLOAD
        </Button>
      </div>

      <DataTable data={items} loading={isLoading} />

      <AttendenceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default Attendence;
