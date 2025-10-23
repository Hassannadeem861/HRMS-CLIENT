import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { getAllEmployers } from "../../utils/client-api";
import Loader from "../../components/loader.jsx";
export default function LoanFormFields({ control }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const employeesData = await getAllEmployers();
        setEmployees(employeesData.users);
      } catch (error) {
        console.log("Error in get all employees", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

      {/* Employee Dropdown */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="employeeId" className="text-right">
          Employee
        </Label>
        <Controller
          name="employeeId"
          control={control}
          rules={{ required: "Employee selection is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <select
                {...field}
                className="border rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? (
                  <option>Loading employees...</option>
                ) : (
                  <>
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name} (EmpNo: {emp.empNo})
                      </option>
                    ))}
                  </>
                )}
              </select>

              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />
      </div>

      {/* Loan Amount */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="loan" className="text-right">
          Loan Amount
        </Label>
        <Controller
          name="loan"
          control={control}
          rules={{ required: "Loan amount is required" }}
          render={({ field, fieldState }) => (
            <div className="col-span-3">
              <Input type="number" placeholder="Enter loan amount" {...field} />
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
        <Label htmlFor="reason" className="text-right">
          Reason
        </Label>
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <div className="col-span-3">
              <Textarea placeholder="Reason for loan" {...field} />
            </div>
          )}
        />
      </div>
    </div>
  );
}
