// src/components/DataTable/DataTable.jsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import Api from "../../services/axios.js"; // Axios instance
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { toast } from "react-hot-toast";
import logo from "../../assets/eb-technology.png";
import Loader from "../loader.jsx";
// ✅ Correct way to register fonts
pdfMake.vfs = pdfFonts.vfs;

export default function DataTable({ data = [] }) {
  const [slip, setSlip] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBase64ImageFromURL = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // const handleDownload = async (item) => {
  //   try {
  //     // Step 1: Get salary slip details
  //     const res = await Api.get(`/api/v1/get-single-salary-slip/${item._id}`);
  //     const slipData = res?.data?.salarySlip;
  //     const EmployeeId = slipData?.employerId?.empNo;

  //     if (!slipData || !EmployeeId) {
  //       toast.error("❌ Salary slip or employee data not found!");
  //       return;
  //     }

  //     // Step 2: Extract month & year
  //     const [year, month] = slipData.month.split("-");

  //     // Step 3: Get attendance data
  //     const response = await Api.get(
  //       `/api/v1/get-single-attendance/${EmployeeId}?month=${month}&year=${year}`
  //     );

  //     const records = response?.data?.records || [];
  //     const summary = response?.data?.summary || {};

  //     // Helper: format date
  //     const formatDate = (dateStr) => {
  //       const date = new Date(dateStr);
  //       return date.toLocaleDateString("en-US", {
  //         month: "2-digit",
  //         day: "2-digit",
  //         year: "numeric",
  //       });
  //     };

  //     // Group records by status
  //     const absentRecords = records.filter(
  //       (r) => r.status?.toLowerCase() === "absent"
  //     );
  //     const lateRecords = records.filter(
  //       (r) => r.status?.toLowerCase() === "late"
  //     );
  //     const onTimeRecords = records.filter(
  //       (r) => r.status?.toLowerCase() === "on time"
  //     );
  //     const leaveRecords = records.filter(
  //       (r) => r.status?.toLowerCase() === "leave"
  //     );

  //     // Step 4: Get Logo + Theme
  //     const logoBase64 = await getBase64ImageFromURL(logo);
  //     const today = new Date().toLocaleDateString();
  //     const primaryColor = "#f4630a";
  //     const borderColor = "#dcdcdc";

  //     // Helper to format record rows into table
  //     const makeTable = (title, records, icon, includeLateBy = false) => {
  //       const header = [
  //         { text: title, style: "sectionHeader", colSpan: 3, alignment: "left" },
  //         {},
  //         {},
  //       ];
  //       const subHeader = includeLateBy
  //         ? ["Date", "Check In", "Late By"]
  //         : ["Date", "Check In", "Check Out"];

  //       const body = [
  //         header,
  //         subHeader.map((t) => ({ text: t, bold: true, fillColor: "#f8f8f8" })),
  //       ];

  //       if (records.length) {
  //         records.forEach((r) => {
  //           body.push([
  //             `${icon} ${formatDate(r.date)}`,
  //             r.firstCheckInTime || "—",
  //             includeLateBy
  //               ? r.lateBy || "—"
  //               : r.lastCheckOutTime || "—",
  //           ]);
  //         });
  //       } else {
  //         body.push([{ text: "No records found", colSpan: 3, alignment: "center" }, {}, {}]);
  //       }

  //       return {
  //         table: {
  //           widths: ["40%", "30%", "30%"],
  //           body,
  //         },
  //         layout: {
  //           hLineWidth: () => 0.5,
  //           vLineWidth: () => 0,
  //           hLineColor: () => borderColor,
  //           paddingTop: () => 4,
  //           paddingBottom: () => 4,
  //         },
  //         margin: [0, 10, 0, 10],
  //       };
  //     };

  //     // Step 5: PDF Definition
  //     const docDefinition = {
  //       pageSize: "A4",
  //       pageMargins: [40, 40, 40, 40],
  //       content: [
  //         // Header with logo and date
  //         {
  //           columns: [
  //             { image: logoBase64, width: 100 },
  //             {
  //               text: `Date: ${today}`,
  //               style: "dateText",
  //               alignment: "right",
  //               margin: [0, 20, 0, 0],
  //             },
  //           ],
  //           margin: [0, 0, 0, 20],
  //         },

  //         // Employee Info
  //         {
  //           table: {
  //             widths: ["50%", "50%"],
  //             body: [
  //               ["Employee Name:", slipData?.employerId?.name || "N/A"],
  //               ["Designation:", slipData?.employerId?.designation || "N/A"],
  //               [
  //                 "Salary Month:",
  //                 new Date(`${slipData?.month}-01`).toLocaleString("en-US", {
  //                   month: "long",
  //                 }),
  //               ],
  //               ["Year:", year],
  //             ],
  //           },
  //           layout: {
  //             hLineWidth: () => 0.5,
  //             vLineWidth: () => 0,
  //             hLineColor: () => borderColor,
  //           },
  //           margin: [0, 0, 0, 20],
  //         },

  //         // Attendance Summary
  //         {
  //           text: "Attendance Summary",
  //           style: "sectionHeader",
  //           margin: [0, 0, 0, 8],
  //         },
  //         {
  //           table: {
  //             widths: ["70%", "30%"],
  //             body: [
  //               ["Working Days", summary.workingDays || 0],
  //               ["Present", summary.present || 0],
  //               ["On Time", summary.onTime || 0],
  //               ["Absent", summary.absent || 0],
  //               ["Late", summary.late || 0],
  //               ["Leaves", summary.leaves || 0],
  //               ["Base Salary", `Rs.${summary.baseSalary || 0}`],
  //               ["Absent Deduction", `Rs.${summary.absentDeduction || 0}`],
  //               ["Late Deduction", `Rs.${summary.lateDeduction || 0}`],
  //             ],
  //           },
  //           layout: {
  //             hLineWidth: () => 0.5,
  //             vLineWidth: () => 0,
  //             hLineColor: () => borderColor,
  //           },
  //         },

  //         {
  //           text: `Net Salary Payable: Rs.${summary.netSalary || 0}`,
  //           style: "sectionHeader",
  //           margin: [0, 20, 0, 20],
  //         },

  //         // ✅ Detailed Attendance Tables
  //         makeTable("Absent Dates", absentRecords, "📅"),
  //         makeTable("Late Dates", lateRecords, "⏰", true),
  //         makeTable("On Time Dates", onTimeRecords, "✅"),
  //         makeTable("Leave Dates", leaveRecords, "🛌"),
  //       ],

  //       styles: {
  //         sectionHeader: { fontSize: 12, bold: true, color: primaryColor },
  //         dateText: { fontSize: 10, color: "#666", margin: [0, 50, 0, 0] },
  //       },
  //     };

  //     // Step 6: Download PDF
  //     pdfMake
  //       .createPdf(docDefinition)
  //       .download(
  //         `Salary_Slip_${slipData?.month}_${
  //           slipData?.employerId?.name?.replace(" ", "_") || "employee"
  //         }.pdf`
  //       );

  //     toast.success("✅ PDF downloaded successfully!");
  //   } catch (err) {
  //     console.error("Download error:", err.message);
  //     toast.error("❌ Failed to download PDF!");
  //   }
  // };

  const handleDownload = async (item) => {
    try {
      setLoading(true);
      // Step 1: Get salary slip details
      const res = await Api.get(`/api/v1/get-single-salary-slip/${item._id}`);
      const slipData = res?.data?.salarySlip;
      const EmployeeId = slipData?.employerId?.empNo;

      if (!slipData || !EmployeeId) {
        toast.error("❌ Salary slip or employee data not found!");
        return;
      }

      // Step 2: Extract month & year from salary slip
      const [year, month] = slipData.month.split("-"); // e.g. "2025-10"

      // Step 3: Call attendance API with query params
      const response = await Api.get(
        `/api/v1/get-single-attendance/${EmployeeId}?month=${month}&year=${year}`
      );

      const attendanceSummary = response?.data?.summary || {};
      const records = response?.data?.records || [];

      // ✅ Step 3.5: Group records by status
      const groupByStatus = (status) =>
        records
          .filter((r) => r.status?.toLowerCase() === status.toLowerCase())
          .map((r) => new Date(r.date).getDate()) // sirf date number show karwana
          .sort((a, b) => a - b);

      const onTimeDates = groupByStatus("On Time");
      const lateDates = groupByStatus("Late");
      const absentDates = groupByStatus("Absent");
      const leaveDates = groupByStatus("Leave");
      const remoteDates = groupByStatus("Remote");

      // Step 4: Generate PDF
      const logoBase64 = await getBase64ImageFromURL(logo);
      const today = new Date().toLocaleDateString();
      const primaryColor = "#f4630a";
      const borderColor = "#e0e0e0";

      const docDefinition = {
        pageSize: "A4",
        pageMargins: [40, 40, 40, 40],
        content: [
          {
            columns: [
              { image: logoBase64, width: 100 },
              {
                text: `Date: ${today}`,
                style: "dateText",
                alignment: "right",
                margin: [0, 20, 0, 0],
              },
            ],
            margin: [0, 0, 0, 20],
          },
          {
            columns: [
              {
                table: {
                  widths: ["50%", "50%"],
                  body: [
                    ["Employee Name:", slipData?.employerId?.name || "N/A"],
                    [
                      "Designation:",
                      slipData?.employerId?.designation || "N/A",
                    ],
                    [
                      "Salary Month:",
                      new Date(`${slipData?.month}-01`).toLocaleString(
                        "en-US",
                        { month: "long" }
                      ),
                    ],
                    ["Year:", year],
                  ],
                },
                layout: {
                  hLineWidth: () => 0.5,
                  vLineWidth: () => 0,
                  hLineColor: () => borderColor,
                },
              },
            ],
            margin: [0, 0, 0, 20],
          },

          // ✅ Attendance Summary Table
          {
            text: "Attendance Summary",
            style: "sectionHeader",
            margin: [0, 0, 0, 8],
          },
          {
            table: {
              widths: ["70%", "30%"],
              body: [
                ["Working Days", attendanceSummary.workingDays || 0],
                ["Present", attendanceSummary.present || 0],
                ["On Time", attendanceSummary.onTime || 0],
                ["Absent", attendanceSummary.absent || 0],
                ["Late", attendanceSummary.late || 0],
                ["Leaves", attendanceSummary.leaves || 0],
                ["Remote", attendanceSummary.remotes || 0],
                ["Base Salary", `Rs.${attendanceSummary.baseSalary || 0}`],
                [
                  "Absent Deduction",
                  `Rs.${attendanceSummary.absentDeduction || 0}`,
                ],
                [
                  "Late Deduction",
                  `Rs.${attendanceSummary.lateDeduction || 0}`,
                ],
                [
                  "Loan Deduction",
                  `Rs.${attendanceSummary.totalLoanDeduction || 0}`,
                ],
              ],
            },
            layout: {
              hLineWidth: () => 0.5,
              vLineWidth: () => 0,
              hLineColor: () => borderColor,
            },
          },

          // ✅ NEW: Detailed Attendance Dates
          {
            text: "Detailed Attendance (Dates)",
            style: "sectionHeader",
            margin: [0, 20, 0, 8],
          },
          {
            table: {
              widths: ["30%", "70%"],
              body: [
                ["On Time", onTimeDates.length ? onTimeDates.join(", ") : "—"],
                ["Late", lateDates.length ? lateDates.join(", ") : "—"],
                ["Absent", absentDates.length ? absentDates.join(", ") : "—"],
                ["Leaves", leaveDates.length ? leaveDates.join(", ") : "—"],
                ["Remotes", remoteDates.length ? remoteDates.join(", ") : "—"],
              ],
            },
            layout: {
              hLineWidth: () => 0.5,
              vLineWidth: () => 0,
              hLineColor: () => borderColor,
            },
          },

          // {
          //   text: `Net Salary Payable: Rs.${attendanceSummary.netSalary || 0}`,
          //   style: "sectionHeader",
          //   margin: [0, 20, 0, 20],
          // },
          {
            text: `Net Salary Payable: Rs.${
              attendanceSummary.finalSalary || 0
            }`,
            style: "sectionHeader",
            margin: [0, 20, 0, 20],
          },
        ],
        styles: {
          sectionHeader: { fontSize: 12, bold: true, color: primaryColor },
          dateText: { fontSize: 10, color: "#666", margin: [0, 50, 0, 0] },
        },
      };

      pdfMake
        .createPdf(docDefinition)
        .download(
          `Salary_Slip_${slipData?.month}_${
            slipData?.employerId?.name?.replace(" ", "_") || "employee"
          }.pdf`
        );

      toast.success("✅ PDF downloaded successfully!");
    } catch (err) {
      console.error("Download error:", err.message);
      toast.error("❌ Failed to download PDF!");
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return <Loader/>
  // }

  return (
    <div className="rounded-md border">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <Loader />
          <p className="text-sm text-gray-600 mt-2">Generating PDF...</p>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employer</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Month</TableHead>
            <TableHead>View Slip</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading || !data.length
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    {[...Array(4)].map((__, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
            : data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item?.employerId?.name}</TableCell>
                  <TableCell>{item?.employerId?.designation}</TableCell>
                  <TableCell>Rs. {item?.employerId?.salary}</TableCell>
                  <TableCell>{item?.month}</TableCell>
                  <TableCell>
                    <button
                      disabled={loading}
                      onClick={() => handleDownload(item)}
                      className={`px-2 py-1 text-sm rounded text-white ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-black hover:bg-gray-800"
                      }`}
                    >
                      {loading ? "Downloading..." : "Download PDF"}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}
