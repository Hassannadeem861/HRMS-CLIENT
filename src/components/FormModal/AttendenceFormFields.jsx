import React from "react";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function AttendenceFormFields({ control }) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="excelFile" className="text-right">
          Excel File
        </Label>
        <Controller
          name="excelFile"
          control={control}
          rules={{ required: "Excel file is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input
                id="excelFile"
                type="file"
                accept=".xls,.xlsx"
                onChange={(e) => field.onChange(e.target.files)}
              />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
