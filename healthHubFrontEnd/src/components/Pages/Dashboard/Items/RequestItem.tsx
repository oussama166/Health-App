import { cn } from "@/lib/utils";
import { Consultation, Doctor, MedcinTime } from "@/type";
import { ColumnDef } from "@tanstack/react-table";
import { addDays, format } from "date-fns";
import { staticStyle } from "./DashboardItem";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/datatable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { getConsultation, updateConsultation } from "@/api/Consultation";
import { AuthContext } from "@/App";

function RequestItem() {
  const { user } = useContext(AuthContext);
  const [doc, setDoc] = useState<Doctor | null>(null);
  const [consultation, setConsultation] = useState<Consultation[]>([]);

  useEffect(() => {
    const fetchUserAndConsultations = async () => {
      if (user) {
        try {
          const userData = JSON.parse(user) as Doctor;
          setDoc(userData);

          const request: MedcinTime = {
            date: format(
              addDays(new Date(), 1),
              "yyyy-MM-dd'T'00:00:00.000'Z'"
            ),
            medecin: userData,
          };

          const consultations = await getConsultation(request);
          setConsultation(consultations);
          console.log(consultations[0]); // Updated state is logged here
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchUserAndConsultations();
  }, [user]);

  const handleStatusChanges = async (
    value: "REJECTED" | "PENDING" | "DONE" | string,
    id: number
  ) => {
    if (doc && doc.id) {
      await updateConsultation({
        id: id,
        status: value,
        date: "",
        startConsultation: "",
        endConsultation: "",
        comment: "Test",
      } as Consultation);
    } else {
      console.error("doc est null ou doc.id est indéfini");
    }
  };
  const columnsConsultationChange: ColumnDef<Consultation>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <StatusComp
            status={row.getValue("status")}
            handelChanges={handleStatusChanges}
            data={row.original}
          />
        );
      },
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

  return (
    <section
      className={`w-full h-screen p-5 flex flex-col gap-5 overflow-y-auto`}
    >
      {/* Title of the screen */}
      {/* BreadCrumb */}
      {/* eg : Home > More > Components > Breadcrumb */}
      <h1 className="text-2xl font-sans font-semibold text-neutral-950 w-full ">
        Request
      </h1>
      <section
        className={cn(
          staticStyle.section,
          `w-full max-h-[100vh] p-10 flex-col items-start justify-start gap-5 rounded-lg`
        )}
      >
        <h1 className="text-2xl font-semibold">
          In this form you can change and manage the consultation of day before{" "}
        </h1>
        <DataTable columns={columnsConsultationChange} data={consultation} />
      </section>
    </section>
  );
}

const StatusComp = ({
  status,
  handelChanges,
  data,
}: {
  status: string;
  handelChanges: (
    value: "REJECTED" | "PENDING" | "DONE" | string,
    id: number
  ) => void;
  data: Consultation;
}) => {
  const [position, setPosition] = useState(status);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge
          className={`p-2 ${
            position === "PENDING"
              ? "bg-yellow-300 text-yellow-800 hover:bg-yellow-300/60 text-yellow-800/60"
              : position === "DONE"
              ? "bg-green-300 text-green-800 hover:bg-green-300/60 text-green-800/60"
              : "bg-red-300 text-red-800 hover:bg-red-300/60 text-red-800/60"
          }`}
        >
          {position}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Consultation state</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(value: string) => {
            setPosition(value);
            handelChanges(value, data.id);
          }}
        >
          <DropdownMenuRadioItem value="PENDING">Pending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="DONE">Done</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="REJECTED">
            Rejected
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RequestItem;
