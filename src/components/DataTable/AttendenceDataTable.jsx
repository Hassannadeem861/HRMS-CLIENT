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
import { useNavigate } from "react-router-dom";

export default function DataTable({ data, loading, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all"); // ✅ month filter state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleView = (item) => {
    const dateObj = new Date(item.date);
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    if (!item) return;
    navigate(
      `/get-single-attendence?empNo=${item.empNo}&month=${month}&year=${year}`
    );
  };

  // 🔹 Apply both search and month filter
  const filteredData = useMemo(() => {
    let temp = data;

    // Month Filter
    if (selectedMonth !== "all") {
      temp = temp.filter((item) => {
        const itemMonth = new Date(item.date).getMonth() + 1;
        return itemMonth === parseInt(selectedMonth);
      });
    }

    // Name Search
    if (searchTerm) {
      temp = temp.filter((item) =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return temp;
  }, [data, searchTerm, selectedMonth]);

  // Pagination logic
  const totalPages = Math.ceil((filteredData?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="rounded-md border bg-white">
      {/* 🔍 Search Bar + Month Filter */}
      <div className="flex flex-wrap justify-between items-center gap-3 p-4 border-b bg-gray-50">
        {/* Month Filter */}
        <div className="flex items-center gap-2">
          <label className="font-medium text-sm text-gray-600">Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
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
                    onClick={() => handleView(item)}
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
                No records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ✅ Pagination */}
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
