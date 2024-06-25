import { AuthContext } from "@/App";
import { getConsultation } from "@/api/Consultation";
import { columns } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/datatable";
import { cn } from "@/lib/utils";
import { Consultation, Doctor, MedcinTime } from "@/type";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { TbArrowBarToLeft, TbArrowBarToRight } from "react-icons/tb";

export const staticStyle = {
  section:
    "font-sans bg-white rounded-md flex justify-between items-center p-5",
};


function DashboardItem() {
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
            date: format(new Date(), "yyyy-MM-dd'T'00:00:00.000'Z'"),
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
  return (
    <section
      className={`w-full h-screen p-5 flex flex-col gap-5 overflow-y-auto`}
    >
      {/* Title of the screen */}
      {/* BreadCrumb */}
      {/* eg : Home > More > Components > Breadcrumb */}
      <h1 className="text-2xl font-sans font-semibold text-neutral-950 w-full ">
        Dashboard
      </h1>

      {/* Start Main Content for dashboard */}
      <section className={cn(staticStyle.section)}>
        {/* Start Static for dashboard */}
        <div
          id="salutation"
          className="w-full inline-flex items-center justify-between "
        >
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-xl">
              Good to see you again,{" "}
              <span className="underline decoration-dotted underline-offset-4">
                {doc?.name}
              </span>
              <span className="text-2xl">👋</span>
            </h1>
            <span className="text-base font-medium  text-neutral-500">
              You came 15 minutes early today
            </span>
          </div>
          <div>
            {/* time to start your day */}
            <div className="inline-flex gap-5 ">
              <div className="inline-flex gap-5 items-center">
                <span className="w-10 h-10 bg-[#0A7E22]/20 flex items-center justify-center rounded-md">
                  <TbArrowBarToLeft className="text-3xl text-[#0A7E22]" />
                </span>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-base font-medium text-neutral-900 ">
                    8:00 AM
                  </h1>
                  <span className="text-base text-neutral-400">Punch in</span>
                </div>
              </div>
              <div className="inline-flex gap-5 items-center">
                <span className="w-10 h-10 bg-[#FD314D]/20 flex items-center justify-center rounded-md">
                  <TbArrowBarToRight className="text-3xl text-[#FD314D]" />
                </span>
                <div className="flex flex-col items-start justify-center">
                  <h1 className="text-base font-medium text-neutral-900">
                    8:00 PM
                  </h1>
                  <span className="text-base text-neutral-400">Punch out</span>
                </div>
              </div>
            </div>
            {/* time to end your day */}
          </div>
        </div>
        {/* End Static for dashboard */}
      </section>
      {/* End Main Content for dashboard */}

      {/* Statics */}
      <section className={cn(staticStyle.section, `px-8 py-4 divide-x`)}>
        {/* Count all the patients */}
        <StaticsComp
          title="Total Patients"
          total={100}
          assisted={85}
          rejected={15}
        />
        {/* Count all the patients in online online patients treated */}
        <StaticsComp
          title="Online Patients"
          total={100}
          assisted={85}
          rejected={15}
          className="px-10"
        />
        {/* Count all the patients in scheduled to be treated in the office  */}
        <StaticsComp
          title="Scheduled Patients"
          total={100}
          assisted={85}
          rejected={15}
          className="px-10"
        />
      </section>

      {/* Schedules of today */}
      <section className={cn(staticStyle.section, "flex-col gap-5 px-8 py-4")}>
        <h1 className="text-xl font-sans font-semibold text-neutral-950 w-full">
          Today's Schedule
        </h1>
        <DataTable columns={columns} data={consultation} />
      </section>
    </section>
  );
}

function StaticsComp({
  title,
  total,
  assisted,
  rejected,
  className,
}: {
  title: string;
  total: number;
  assisted: number;
  rejected: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `flex flex-col item-start justify-between space-y-4`,
        className
      )}
    >
      <h1 className="text-xl font-sans font-semibold text-neutral-950 w-full">
        {title}
      </h1>
      <h1 className="text-4xl font-semibold text-blues-600 w-full tabular-nums font-Roboto">
        {total}
      </h1>
      <div className="inline-flex gap-5 justify-start">
        <div className="space-x-3 text-base">
          <span className="font-medium text-neutral-600">Assisted</span>
          <span className="font-medium text-blues-600 tabular-nums font-Roboto">
            {assisted}
          </span>
        </div>
        <div className="space-x-3 text-base">
          <span className="font-medium text-neutral-600">Rejected</span>
          <span className="font-medium text-red-600 tabular-nums font-Roboto">
            {rejected}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardItem;
