"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable, // <-- Make sure this is imported
} from "@tanstack/react-table"; // Ensure that the import is from the correct package

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // This is your custom table component, right?

const getStateColor = (state) => {
  switch (state) {
    case "approved":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-blue-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function DataTable({ columns, data }) {
  const table = useReactTable({
    data: data || [],
    columns, // Ensure columns is an array here
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="border rounded-xl">
      <Table>
        <TableHeader>
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      cell.column.id === "state"
                        ? getStateColor(cell.getValue())
                        : ""
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
