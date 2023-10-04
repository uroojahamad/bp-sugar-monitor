import React, { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";
import { Reading } from "@/app/bloodsugar/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlRice,
  faClock,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type DisplayDetailsProps = {
  setSugarReading: Dispatch<SetStateAction<Reading[]>>;
  sugarReading: Reading[];
};

const DisplayBloodSugarDetails = ({
  sugarReading,
  setSugarReading,
}: DisplayDetailsProps) => {
  const supabase = createClientComponentClient();

  const deleteBloodSugarData = async (id: string) => {
    const { error } = await supabase.from("bloodsugar").delete().eq("id", id);
    if (error) {
      console.log("Error while deleting a record: ", error);
    }
  };

  const handleDelete = (id: string) => {
    setSugarReading((prevReading) => {
      return prevReading.filter((reading) => reading.id !== id);
    });
    deleteBloodSugarData(id);
  };
  return (
    <>
      {sugarReading.map((reading) => {
        return (
          <div
            className="bg-slate-800 p-2 mx-6 rounded-2xl my-1 w-full relative"
            key={reading.id}
          >
            <div className="flex flex-row justify-center items-center rounded-l-xl">
              <div className="flex flex-col justify-center items-center px-6 sm:px-0 sm:pl-2 sm:-ml-9 md:px-0 md:pl-2 md:-ml-9 py-4 border border-r-4 border-r-violet-600 border-t-0 border-l-0 border-b-0 w-28">
                <p className="font-serif text-2xl font-semibold text-center text-white md:text-left">
                  {reading.sugar_level}
                </p>
                <p className="font-serif text-sm font-thin text-center text-white md:text-left">
                  mmHg
                </p>
              </div>
              <div className="w-80 px-4 py-3">
                <p className="max-w-xs my-2 text-lg leading-6 tracking-wide text-white text-left">
                  {reading.category}
                </p>
                <p className="max-w-xs my-2 text-xs leading-4 tracking-wide text-white text-left">
                  <FontAwesomeIcon icon={faBowlRice} className="mr-2" />{" "}
                  {reading.measure}
                </p>
                <p className="max-w-xs my-2 text-xs leading-4 tracking-wide  text-white text-left">
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

export default DisplayBloodSugarDetails;
