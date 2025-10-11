import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import TableActions from "./TableActions";
import {
  formatDateOnly,
  formatTimeOnly,
} from "../../helper_functions/all-helper-functions.js";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Eye } from "lucide-react";

export default function DataTable({ data, loading, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleView = (empNo) => {
    if (!empNo) return;
    window.location.href = `/get-single-attendence?empNo=${empNo}`;
  };

  // 🔹 Filter Data by Name (case-insensitive)
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data?.filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // 🔹 Pagination calculations
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="rounded-md border bg-white">
      {/* 🔍 Search Bar */}
      <div className="flex justify-between items-center p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold">Attendance Records</h2>
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page on search
          }}
          className="w-64"
        />
      </div>

      {/* 📋 Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Department</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>EmpNo</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CheckIn</TableHead>
            <TableHead>CheckOut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {Array(9)
                    .fill(0)
                    .map((__, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
          ) : currentData?.length > 0 ? (
            currentData.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.department || "N/A"}</TableCell>
                <TableCell>{item?.name || "N/A"}</TableCell>
                <TableCell>{item?.empNo || "N/A"}</TableCell>
                <TableCell>{formatDateOnly(item?.date) || "N/A"}</TableCell>
                <TableCell>{formatTimeOnly(item?.date) || "N/A"}</TableCell>
                <TableCell>{item?.status || "N/A"}</TableCell>
                <TableCell>
                  {item?.checkInCount ? "In" : item?.checkInCount || "N/A"}
                </TableCell>
                <TableCell>
                  {item?.checkOutCount ? "Out" : item?.checkOutCount || "N/A"}
                </TableCell>
                <TableCell className="flex gap-2 items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleView(item.empNo)}
                    title="View Single Attendance"
                  >
                    <Eye className="h-4 w-4 text-blue-600" />
                  </Button>
                  <TableActions
                    onEdit={() => onEdit(item)}
                    onDelete={() => onDelete(item._id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                No items found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ✅ Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-between items-center p-4 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
