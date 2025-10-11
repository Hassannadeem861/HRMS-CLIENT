import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table.jsx";
import { Skeleton } from "../../../components/ui/skeleton";
import TableActions from "../../../components/DataTable/TableActions.jsx";
import { formatDateOnly } from "../../../helper_functions/all-helper-functions.js";

export default function OfficeTimeDataTable({
  data,
  loading,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Check-In</TableHead>
            <TableHead>Check-Out</TableHead>
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
                <TableCell>{formatDateOnly(item.date)}</TableCell>
                <TableCell>{item.checkInTime}</TableCell>
                <TableCell>{item.checkOutTime}</TableCell>
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
                No office times found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
