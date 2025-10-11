import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

export default function HolidayFormFields({ control }) {
  return (
    <div className="grid gap-4 py-4">
      {/* Date Field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">
          Date
        </Label>
        <Controller
          name="date"
          control={control}
          rules={{ required: "Date is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="date" type="date" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Title Field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input id="title" type="text" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Type Field */}
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <div className="col-span-3">
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="National">National</SelectItem>
                <SelectItem value="Company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      />
    </div>
  );
}
