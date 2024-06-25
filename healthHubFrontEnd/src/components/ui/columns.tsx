import { cn } from "@/lib/utils";
import { Consultation, Patient } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Schedule = {
  id: number;
  title: string;
  date: string;
  startTime: string | Date | number;
  endTime: string;
  location: string;
  description: string;
};

export type scheduleConsultation = {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  phone: string;
  location: "office" | "online";
  state: "pending" | "approved" | "rejected";
};

export const columns: ColumnDef<Consultation>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Date of Consultation",
    cell: ({ row }) => {
      const dt = format(row.getValue("date"), "dd/MM/yyyy");
      return (
        <div className="w-full flex items-center justify-center">{dt}</div>
      );
    },
  },
  {
    accessorKey: "startConsultation",
    header: "Start Session at",
    cell: ({ row }) => {
      const dt = format(row.getValue("startConsultation"), "HH:mm");
      return (
        <div className="w-full flex items-center justify-center">{dt}</div>
      );
    },
  },
  {
    accessorKey: "endConsultation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Session at
          <MoreHorizontal className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dt = format(row.getValue("endConsultation"), "HH:mm");
      return (
        <div className="w-full flex items-center justify-center">{dt}</div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <MoreHorizontal className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-full flex items-center justify-center">
        <Badge
          className={cn(
            row.getValue("status") == "DONE"
              ? "bg-green-500 hover:bg-green-600/80"
              : "bg-yellow-500 hover:bg-yellow-600/80",
            "font-semibold p-2 uppercase tracking-widest cursor-pointer"
          )}
        >
          {row.getValue("status")}
        </Badge>
      </div>
    ),
  },
];

export const columnsConsultation: ColumnDef<Consultation>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Date of Consultation",
    cell: ({ row }) => {
      const dt = format(row.getValue("date"), "dd/MM/yyyy");
      return (
        <div className="w-full flex items-center justify-center">{dt}</div>
      );
    },
  },
  {
    accessorKey: "startConsultation",
    header: "Start Session at",
    cell: ({ row }) => {
      const dt = format(row.getValue("startConsultation"), "HH:mm");
      return (
        <div className="w-full flex items-center justify-center">{dt}</div>
      );
    },
  },
  {
    accessorKey: "endConsultation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Session at
          <MoreHorizontal className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dt = format(row.getValue("endConsultation"), "HH:mm");
      return (
        <div className="w-full flex items-center justify-center">{dt}</div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Description",
  },
];



