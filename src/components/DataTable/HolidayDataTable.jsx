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

export default function HolidayDataTable({ data, loading, onEdit, onDelete }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Title</TableHead>
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
                  {Array(4)
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
                <TableCell>{item?.title || "N/A"}</TableCell>
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
              <TableCell colSpan={4} className="text-center py-4">
                No holidays found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
