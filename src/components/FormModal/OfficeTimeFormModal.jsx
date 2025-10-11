import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import OfficeTimeFormFields from "./OfficeTimeFormFields.jsx";

export default function OfficeTimeFormModal({
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
    defaultValues: {
      date: "",
      checkInTime: "",
      checkOutTime: "",
      reason: "",
    },
  });

  // ✅ jab editItem (defaultValues) change ho to form update ho
  useEffect(() => {
    if (defaultValues) {
      // 🕒 Convert 12-hour format (e.g. "6:00 PM") → 24-hour (e.g. "18:00")
      const convertTo24Hour = (timeStr) => {
        if (!timeStr) return "";
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":");
        if (modifier === "PM" && hours !== "12") hours = String(+hours + 12);
        if (modifier === "AM" && hours === "12") hours = "00";
        return `${hours.padStart(2, "0")}:${minutes}`;
      };

      reset({
        ...defaultValues,
        checkInTime: convertTo24Hour(defaultValues.checkInTime),
        checkOutTime: convertTo24Hour(defaultValues.checkOutTime),
      });
    } else {
      reset({
        date: "",
        checkInTime: "",
        checkOutTime: "",
        reason: "",
      });
    }
  }, [defaultValues, reset]);

  //   useEffect(() => {
  //     if (defaultValues) {
  //       reset(defaultValues);
  //     } else {
  //       reset({
  //         date: "",
  //         checkInTime: "",
  //         checkOutTime: "",
  //         reason: "",
  //       });
  //     }
  //   }, [defaultValues, reset]);

  //   const handleFormSubmit = async (data) => {
  //     await onSubmit(data);
  //     reset({
  //       date: "",
  //       checkInTime: "",
  //       checkOutTime: "",
  //       reason: "",
  //     });
  //   };

  const handleFormSubmit = async (data) => {
    const convertTo12Hour = (time24) => {
      const [hour, minute] = time24.split(":");
      const h = parseInt(hour);
      const ampm = h >= 12 ? "PM" : "AM";
      const formattedHour = h % 12 || 12;
      return `${formattedHour}:${minute} ${ampm}`;
    };

    const formattedData = {
      ...data,
      checkInTime: convertTo12Hour(data.checkInTime),
      checkOutTime: convertTo12Hour(data.checkOutTime),
    };

    await onSubmit(formattedData);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Edit Office Time" : "Add Office Time"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <OfficeTimeFormFields control={control} />
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
