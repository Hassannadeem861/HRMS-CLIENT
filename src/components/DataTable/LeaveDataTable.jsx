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
import { formatDateOnly } from "../../helper_functions/all-helper-functions.js";

export default function LeaveDataTable({
  employees,
  data,
  loading,
  onEdit,
  onDelete,
}) {
  // 👇 employee number se name find karne ka helper
  const getEmployeeName = (empNo) => {
    const found = employees?.find((emp) => String(emp.empNo) === String(empNo));
    return found ? found.name : "N/A";
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Employee_Name</TableHead>
            {/* <TableHead>Employee</TableHead> */}
            <TableHead>Reason</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {Array(5)
                    .fill(0)
                    .map((__, i) => (
                      <TableCell key={i}>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
          ) : data?.length > 0 ? (
            data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{formatDateOnly(item?.date) || "N/A"}</TableCell>
                {/* <TableCell>{item?.employee?.name || "N/A"}</TableCell> */}
                <TableCell>{getEmployeeName(item?.empNo)}</TableCell>{" "}
                {/* <TableCell>{item?.empNo || "N/A"}</TableCell> */}
                <TableCell>{item?.reason || "N/A"}</TableCell>
                <TableCell>{item?.type || "N/A"}</TableCell>
                <TableCell>
                  <TableActions
                    onEdit={() => onEdit(item)}
                    onDelete={() => onDelete(item._id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No leaves found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
