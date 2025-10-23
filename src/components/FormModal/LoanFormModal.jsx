import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import LoanFormFields from "./LoanFormFields.jsx";

export default function LoanFormModal({
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
    defaultValues: {
      date: "",
      employeeId: "",
      loan: "",
      reason: "",
    },
  });

 useEffect(() => {
    if (defaultValues) {

      // ✅ Map correct values for edit mode
      const mappedValues = {
        date: defaultValues.date || "",
        employeeId:
          typeof defaultValues.employeeId === "object"
            ? defaultValues.employeeId._id
            : defaultValues.employeeId || "",
        loan: defaultValues.loan || "",
        reason: defaultValues.reason || "",
      };

      reset(mappedValues);
    } else {
      reset({ date: "", employeeId: "", loan: "", reason: "" });
    }

    clearErrors();
  }, [defaultValues, reset, clearErrors]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{defaultValues ? "Edit Loan" : "Add Loan"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <LoanFormFields control={control} />
          <div className="flex justify-end gap-2">
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
