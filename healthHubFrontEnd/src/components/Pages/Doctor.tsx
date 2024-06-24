import { useEffect, useState } from "react";
import {
  DateField,
  DateInput,
  DateSegment,
  Label,
  TextArea,
  TextField,
  TimeField,
} from "react-aria-components";

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

function Doctor() {
  const id = useParams().id;
  useEffect(() => {
    console.log(id);
  }, [id]);

  const [date, setDate] = useState<Date>();

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
              <ConsultationBody date={date} setDate={setDate} />
              <DrawerFooter>
                <Button className="w-full py-7 text-xl">Submit</Button>
                <DrawerClose>
                  <Button variant="outline" className="w-full py-7 text-xl">
                    Cancel
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
            United States
          </h1>
          <h1 className="text-xl font-semibold text-blues-500">
            napu@dekjicu.pr
          </h1>
          <h1 className="text-xl font-semibold text-blues-500">Specialty</h1>

          <p className="text-lg text-neutral-500 font-semibold leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
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
  date,
  setDate,
  time,
  setTime,
}: {
  date?: Date | undefined;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
  time?: Date | undefined;
  setTime?: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) => {
  return (
    <>
      <div className="w-[50%] flex flex-col items-center gap-10 mx-auto my-9">
        <h1 className="text-2xl font-semibold text-black">Book Consultation</h1>
        <div className="flex flex-row gap-5 w-full justify-start items-center">
          <TimeField className={"text-xl space-y-2"}>
            <Label>Start Time</Label>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </TimeField>
          <TimeField className={"text-xl space-y-2"}>
            <Label>End Time</Label>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </TimeField>

          <DateField className={"text-xl space-y-2"}>
            <Label>Date of Consultation</Label>
            <DateInput>
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
          </DateField>
        </div>
        <TextField className={"text-xl space-y-2 w-full"}>
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
export default Doctor;
