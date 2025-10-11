import React, { useState, useEffect } from "react";
import { getSingleAttendence } from "../utils/attendence-api.js";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import Loader from "../components/loader.jsx";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const GetSingleAttendence = () => {
  const [searchParams] = useSearchParams();
  const empFromQuery = searchParams.get("empNo"); // ✅ get empNo from query

  const [empNo, setEmpNo] = useState(empFromQuery || "");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Month & Year dropdown data
  const months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  const years = Array.from({ length: 30 }, (_, i) => 2020 + i); // 2020 → 2049

  const handleSearch = async () => {
    if (!empNo || !month || !year) {
      toast.error("Please select Employee, Month, and Year");
      return;
    }

    setLoading(true);
    const res = await getSingleAttendence(empNo, month, year);
    setAttendance(res);
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Get Single Attendance</h1>

      {/* 🔹 Filters */}
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* ✅ Employer Dropdown (disabled if from query) */}
          <select
            className="border p-2 rounded-md"
            value={empNo}
            onChange={(e) => setEmpNo(e.target.value)}
            // disabled={!!empFromQuery}
          >
            <option value="">Select Employee</option>
            {empNo && <option value={empNo}>Employee No: {empNo}</option>}
          </select>

          {/* ✅ Month Dropdown */}
          <select
            className="border p-2 rounded-md"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.name} ({m.value})
              </option>
            ))}
          </select>

          {/* ✅ Year Dropdown */}
          <select
            className="border p-2 rounded-md"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Loading..." : "Fetch Attendance"}
          </Button>
        </div>
      </Card>

      {/* 🔹 Results */}
      {attendance && (
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            Attendance Summary (EmpNo: {empNo})
          </h2>

          {/* ✅ Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(attendance.summary).map(([key, value]) => {
              // ✅ Convert camelCase → Normal format
              const formattedKey = key
                .replace(/([A-Z])/g, " $1") // har capital letter se pehle space
                .replace(/^./, (str) => str.toUpperCase()); // pehla letter capitalize

              return (
                <div key={key} className="p-3 border rounded-lg">
                  <strong>{formattedKey}:</strong> {value}
                </div>
              );
            })}
          </div>

          {/* ✅ Table of Records */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Late By</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Extra Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.records.map((r, i) => (
                <TableRow key={i}>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell>{r.firstCheckInTime || "-"}</TableCell>
                  <TableCell>{r.lastCheckOutTime || "-"}</TableCell>
                  <TableCell>{r.lateBy || "-"}</TableCell>
                  <TableCell>{r.totalHours || "-"}</TableCell>
                  <TableCell>{r.extraHours || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};

export default GetSingleAttendence;
