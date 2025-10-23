import React, { useState, useEffect } from "react";
import { getSingleAttendence } from "../utils/attendence-api.js";
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
  const empNo = searchParams.get("empNo");
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // agar 3 required query parameters maujood hain to fetch karo
    if (!empNo || !month || !year) {
      toast.error("Missing parameters: empNo, month, or year");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getSingleAttendence(empNo, month, year);
        setAttendance(res);
      } catch (err) {
        console.error("Error fetching attendance:", err.message);
        toast.error("Failed to fetch attendance");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [empNo, month, year]);

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Attendance Record</h1>

      <Card className="p-4">
        {/* <div className="mb-4">
          <strong>Employee No:</strong> {empNo} <br />
          <strong>Month:</strong> {month} <br />
          <strong>Year:</strong> {year}
        </div> */}

        {attendance ? (
          <>
            {/* ✅ Summary Section */}
            <h2 className="text-xl font-semibold mb-3">Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(attendance.summary).map(([key, value]) => {
                const formattedKey = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());
                return (
                  <div key={key} className="p-3 border rounded-lg">
                    <strong>{formattedKey}:</strong> {value}
                  </div>
                );
              })}
            </div>

            {/* ✅ Detailed Records */}
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
          </>
        ) : (
          <p>No attendance data available.</p>
        )}
      </Card>
    </div>
  );
};

export default GetSingleAttendence;
