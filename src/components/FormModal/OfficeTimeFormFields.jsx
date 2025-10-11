import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function OfficeTimeFormFields({ control }) {
  return (
    <div className="grid gap-4 py-4">
      {/* Date */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">Date</Label>
        <Controller
          name="date"
          control={control}
          rules={{ required: "Date is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input type="date" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Check In */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="checkInTime" className="text-right">Check-In</Label>
        <Controller
          name="checkInTime"
          control={control}
          rules={{ required: "Check-in time is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input type="time" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Check Out */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="checkOutTime" className="text-right">Check-Out</Label>
        <Controller
          name="checkOutTime"
          control={control}
          rules={{ required: "Check-out time is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input type="time" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Reason */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="reason" className="text-right">Reason</Label>
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <div className="col-span-3">
              <Textarea placeholder="Optional reason" {...field} />
            </div>
          )}
        />
      </div>
    </div>
  );
}
