import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import FormFields from "./AttendenceFormFields.jsx";
import { Button } from "../ui/button";

export default function AttendenceFormModal({ isOpen, onClose, onSubmit }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      excelFile: null,
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      if (!data.excelFile?.[0]) {
        alert("❌ Please select an Excel file");
        return;
      }
      await onSubmit(data.excelFile[0]);
      reset();
    } catch (error) {
      console.log("Error in Handle form submit function :", error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Attendance</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormFields control={control} />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
