"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = (updateStateInSupabase) => [
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "variant",
    header: "Variant",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => updateStateInSupabase(id, "approved")}
            >
              Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => updateStateInSupabase(id, "cancelled")}
            >
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
