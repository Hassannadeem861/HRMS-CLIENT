import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table.jsx";
import { Skeleton } from "../../ui/skeleton";
import TableActions from "../TableActions.jsx";
import { formatDateOnly } from "../../../helper_functions/all-helper-functions.js";

export default function LoanDataTable({ data, loading, onEdit, onDelete }) {

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Loan Amount</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array(5)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  {Array(5)
                    .fill(0)
                    .map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-[100px]" />
                      </TableCell>
                    ))}
                </TableRow>
              ))
          ) : data?.length > 0 ? (
            data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{formatDateOnly(item.date) || "—"}</TableCell>
                <TableCell>{item.employeeId?.name || "—"}</TableCell>
                <TableCell>{item.loan || 0}</TableCell>
                <TableCell>{item.reason || "—"}</TableCell>
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
                No loan records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
