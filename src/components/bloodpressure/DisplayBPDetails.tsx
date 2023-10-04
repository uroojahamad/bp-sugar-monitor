import { Reading } from "@/app/page";
import {
  faClock,
  faHandBackFist,
  faHeartPulse,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import React, { Dispatch, SetStateAction } from "react";

type DisplayBPDetailsProps = {
  setBpReading: Dispatch<SetStateAction<Reading[]>>;
  bpReading: Reading[];
};

const DisplayBPDetails = ({
  bpReading,
  setBpReading,
}: DisplayBPDetailsProps) => {
  const supabase = createClientComponentClient();

  const deleteBpData = async (id: string) => {
    const { error } = await supabase.from("bp").delete().eq("id", id);
    if (error) {
      console.log("Error while deleting a record: ", error);
    }
  };

  const handleDelete = (id: string) => {
    setBpReading((prevReading) => {
      return prevReading.filter((reading) => reading.id !== id);
    });
    deleteBpData(id);
  };

  return (
    <>
      {bpReading.map((reading) => {
        return (
          <div
            className="bg-slate-800 p-2 mx-6 rounded-2xl my-1 w-full relative"
            key={reading.id}
          >
            <div className="flex flex-row justify-center items-center rounded-l-xl">
              <div className="flex flex-col justify-center items-center px-6 sm:px-0 sm:pl-2 sm:-ml-9 md:px-0 md:pl-2 md:-ml-9 py-4 border border-r-4 border-r-violet-600 border-t-0 border-l-0 border-b-0 w-28">
                <p className="font-serif text-2xl font-semibold text-center text-white md:text-left">
                  {reading.systolic}
                </p>
                <p className="font-serif text-2xl font-semibold text-center text-white md:text-left">
                  {reading.diastolic}
                </p>
                <p className="font-serif text-sm font-thin text-center text-white md:text-left">
                  mmHg
                </p>
              </div>
              <div className="w-80 px-4 py-2 text-slate-200">
                <p className="max-w-xs mt-2 mb-3 text-lg leading-6 tracking-wide text-white text-left">
                  {reading.category}
                </p>
                <p className="max-w-xs my-2 text-xs leading-4 tracking-wide  text-left">
                  <FontAwesomeIcon icon={faHeartPulse} className="mr-2" />{" "}
                  {reading.pulse} BPM
                </p>
                <p className="max-w-xs my-2 text-xs leading-4 tracking-wide  text-left">
                  <FontAwesomeIcon icon={faHandBackFist} className="mr-2" />{" "}
                  {reading.arm}
                </p>
                <p className="max-w-xs my-2 text-xs leading-4 tracking-wide   text-left">
                  <FontAwesomeIcon icon={faClock} className="mr-2" />{" "}
                  {dayjs(reading.created_at).format("YYYY/MM/DD hh:mm A")}
                </p>
              </div>
            </div>
            <div
              className="absolute top-2 right-3 cursor-pointer"
              onClick={() => handleDelete(reading.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} color="white" />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DisplayBPDetails;
