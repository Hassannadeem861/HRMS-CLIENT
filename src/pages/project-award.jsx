import { useState, useEffect } from "react";
import DataTable from "../components/DataTable/ProjectAwardDataTable.jsx";
import FormModal from "../components/FormModal/ProjectAwardFormModal.jsx";
import { Button } from "../components/ui/button.jsx";
import { Plus } from "lucide-react";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../utils/project-award-api.js";
import { SectionCards } from "../components/section-cards.jsx";

const Container = () => {
  const [items, setItems] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProjects();
      setItems(data?.projects);
    } catch (error) {
      console.error("Error loading items:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createProject(formData); // ✅ FormData send karo
      await loadItems();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating item:", error.message);
    }
  };

  const handleUpdate = async (_id, formData) => {
    try {
      await updateProject(_id, formData);
      await loadItems();
      setIsModalOpen(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("Error updating item:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      await loadItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const openEditModal = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  return (
    <>
      <br />
      <SectionCards projects={items} />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project-Award</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>

        <DataTable
          data={items}
          loading={isLoading}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />

        <FormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentItem(null);
          }}
          onSubmit={currentItem ? handleUpdate : handleCreate} // ✅ Yeh line change karo
          initialData={currentItem}
        />
      </div>
    </>
  );
};

export default Container;
