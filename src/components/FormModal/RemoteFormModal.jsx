import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { useForm } from "react-hook-form";
import RemoteFormFields from "./RemoteFormField.jsx";
import { Button } from "../ui/button";

export default function RemoteFormModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: defaultValues || {
      date: "",
      employee: "",
      reason: "",
      workMode: "Remote",
    },
  });

  const handleFormSubmit = async (data) => {
    const payload = {
      empNo: Number(data.employee),
      date: data.date,
      reason: data.reason,
      workMode: data.workMode,
    };
    try {
      await onSubmit(payload);
      reset();
    } catch (error) {
      console.log("Error in form submit:", error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Remote" : "Add Remote"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <RemoteFormFields control={control} />
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
