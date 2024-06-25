import { useEffect, useState } from "react";
import {
  DateField,
  DateInput,
  DateSegment,
  Label,
  TextArea,
  TextField,
  TimeField,
  TimeValue,
} from "react-aria-components";

import { getDoctorByName } from "@/api/Medecin";
import { Consultation, Doctor, Patient } from "@/type";
import { parseDate } from "@internationalized/date";
import { format, parse, parseISO } from "date-fns";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "../ui/drawer";
import { createConsultation } from "@/api/Consultation";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

function DoctorInfo() {
  const { id } = useParams<{ id: string }>();
  const [doctordata, setDoc] = useState<Doctor | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [consultationDone, setConsultationDone] = useState<boolean>(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const storedPatient = localStorage.getItem("Patient");
        if (storedPatient) {
          setPatient(JSON.parse(storedPatient));
        }

        const doctorsData = await getDoctorByName(id);
        if (doctorsData && doctorsData.length > 0) {
          setDoc(doctorsData[0]);
        } else {
          console.error("No doctor found for the given name");
        }
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };
    fetchDoctors();
  }, [id]);

  useEffect(() => {
    console.log(patient);
  }, [patient]);

  useEffect(() => {
    console.log(doctordata);
  }, [doctordata]);

  const parseDate = (date: string) => {
    const parsedDate = parseISO(date);
    return format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  };
  const parseTime = (date: string, time: string) => {
    const parsedTime = parse(time, "HH:mm:ss", date);
    // const formattedStartTime = format(parsedTime, "HH:mm:ss");
    return format(parsedTime, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  };

  // create a new consultation
  const createConsult = async () => {
    try {
      const consultation: Consultation = {
        id: 0,
        date: parseDate(date),
        startConsultation: parseTime(date, startTime),
        endConsultation: parseTime(date, endTime),
        comment: description,
        Status: "PENDING",
        medecin: doctordata,
        patientConsulatation: patient,
      };
      setConsultationDone(await createConsultation(consultation));
      console.log(consultationDone);
      if (consultationDone) {
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error creating consultation", error);
    }
  };

  return (
    <div className="w-full px-24 pt-40 flex flex-col gap-10">
      <div className="flex flex-row flex-shrink-0 gap-20 ">
        {/* Start Section Image */}
        <div className="space-y-5">
          <div className="min-w-56 min-h-56 w-56  h-56  rounded-full flex items-center justify-center bg-[url('/xavatario.png')] bg-center bg-cover bg-no-repeat"></div>
          <Drawer>
            <DrawerTrigger>
              <Button
                variant={"default"}
                size={"lg"}
                className="text-xl font-semibold bg-blues-500 hover:bg-blues-600"
              >
                <span>Book Appointment</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <ConsultationBody
                setDate={setDate}
                setStartTime={setStartTime}
                setEndTime={setEndTime}
                setDescription={setDescription}
              />
              <Toaster expand />
              <DrawerFooter>
                <Button
                  className="w-full py-7 text-xl"
                  onClick={() => createConsult()}
                >
                  Submit
                </Button>
                <DrawerClose>
                  <Button variant="outline" className="w-full py-7 text-xl">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        {/* End Section Image */}

        {/* Start Section Info */}
        <div className="space-y-5 mt-5">
          <h1 className="text-3xl font-semibold text-blues-500">Dr. {id}</h1>
          <h1 className="text-xl font-semibold text-blues-500">
            {doctordata?.ville}
          </h1>
          <h1 className="text-xl font-semibold text-blues-500">
            {doctordata?.email}
          </h1>
          <h1 className="text-xl font-semibold text-blues-500">
            {doctordata?.specialty}
          </h1>

          <p className="text-lg text-neutral-500 font-semibold leading-relaxed">
            {doctordata?.price}$
          </p>
        </div>

        {/* End *Section Info */}
      </div>
      {/* Start Section Review */}
      <div className="flex flex-col items-start">
        <ReviewComp
          name="John Doe"
          rating={4.5}
          review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        />
      </div>
      {/* End Section Review */}
    </div>
  );
}

const ReviewComp = ({
  name,
  rating,
  review,
}: {
  name: string;
  rating: number;
  review: string;
}) => {
  const format = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    minimumFractionDigits: 2,
  });
  return (
    <div className="max-w-[600px] p-10 flex flex-col items-start rounded-md border-2 border-neteurals-500/10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-medium">{name}</h1>
        <span className="inline-flex justify-start items-center gap-1 font-semibold text-lg text-neutral-500">
          <FaStar className="text-yellow-400" /> {format.format(rating)}
        </span>
      </div>
      <p className="text-base leading-relaxed tracking-normal text-black/70 font-medium py-2">
        {review}
      </p>
    </div>
  );
};

const ConsultationBody = ({
  setDate,
  setStartTime,
  setEndTime,
  setDescription,
}: {
  setDate?: React.Dispatch<React.SetStateAction<string>>;
  setStartTime?: React.Dispatch<React.SetStateAction<string>>;
  setEndTime?: React.Dispatch<React.SetStateAction<string>>;
  setDescription?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <div className="w-[50%] flex flex-col items-center gap-10 mx-auto my-9">
        <h1 className="text-2xl font-semibold text-black">Book Consultation</h1>
        <div className="flex flex-row gap-5 w-full justify-start items-center">
          <TimeField
            className={"text-xl space-y-2"}
            onChange={(e: TimeValue) => {
              if (e != undefined) {
                console.log(e.toString());
                setStartTime(e.toString());
              }
            }}
          >
            <Label>Start Time</Label>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </TimeField>
          <TimeField
            className={"text-xl space-y-2"}
            onChange={(e: TimeValue) => {
              if (e != undefined) {
                console.log(e.toString());
                setEndTime(e.toString());
              }
            }}
          >
            <Label>End Time</Label>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </TimeField>

          <DateField
            className={"text-xl space-y-2"}
            onChange={(e) => {
              console.log(e);
              console.log(e.toString());
              setDate(e.toString());
            }}
            defaultValue={parseDate(format(new Date(), "yyyy-MM-dd"))}
          >
            <Label>Date of Consultation</Label>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </DateField>
        </div>
        <TextField
          className={"text-xl space-y-2 w-full"}
          onChange={(e) => {
            console.log(e);
            console.log(e.toString());
            setDescription(e.toString());
          }}
        >
          <Label>Description</Label>
          <TextArea
            className={
              "react-aria-TextField react-aria-TextArea min-h-[100px] "
            }
          />
        </TextField>
      </div>
    </>
  );
};
export default DoctorInfo;
