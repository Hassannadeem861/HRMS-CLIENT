import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { getAllEmployers } from "../../utils/client-api.js";

export default function LeaveFormFields({ control }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getAllEmployers();
        setEmployees(res?.users); // direct employee objects
      } catch (error) {
        console.error("Error fetching employees:", error.message);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="grid gap-4 py-4">
      {/* Date */}
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

      {/* Employee */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="employee" className="text-right">
          Employee
        </Label>
        <Controller
          name="employee"
          control={control}
          rules={{ required: "Employee is required" }}
          render={({ field }) => (
            <div className="col-span-3">
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.length > 0 ? (
                    employees.map((emp) => (
                      <SelectItem key={emp.empNo} value={String(emp.empNo)}>
                        {emp.name} (#{emp.empNo})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-employee" disabled>
                      No employees found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      {/* Reason */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="reason" className="text-right">
          Reason
        </Label>
        <Controller
          name="reason"
          control={control}
          rules={{ required: "Reason is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Textarea id="reason" placeholder="Enter reason" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Type */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type" className="text-right">
          Type
        </Label>
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
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                  <SelectItem value="Sick">Sick</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="HalfDay">Half Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>
    </div>
  );
}
