import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import HolidayFormFields from "./HolidayFormFields.jsx";
import { Button } from "../ui/button";

export default function HolidayFormModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) {
  const {
    handleSubmit,
    control,
    reset,
    clearErrors,

    formState: { isSubmitting },
  } = useForm({
    defaultValues: defaultValues || { date: "", title: "", type: "" },
  });

  useEffect(() => {
    if (defaultValues) {
      const mappedValues = {
        ...defaultValues,
        employee: String(defaultValues.empNo), // 👈 important change
      };
      reset(mappedValues);
    } else {
      // 👇 ye line add karo: jab new add kare to form clean ho jaye
      reset({
        date: "",
        employee: "",
        reason: "",
        workMode: "Remote",
      });
    }
    clearErrors();
  }, [defaultValues, reset, clearErrors]);

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.log("Error in form submit:", error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Edit Holiday" : "Add Holiday"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <HolidayFormFields control={control} />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : defaultValues ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
