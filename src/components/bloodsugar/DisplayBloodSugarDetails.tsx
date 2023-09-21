import React from "react";
import dayjs from "dayjs";
import { Reading } from "@/app/bloodsugar/page";

type DisplayDetailsProps = {
  sugarReading: Reading[];
};

const DisplayBloodSugarDetails = ({ sugarReading }: DisplayDetailsProps) => {
  return (
    <>
      {sugarReading.map((reading) => {
        return (
          <div
            className="bg-slate-600 p-2 mx-6 rounded-2xl my-1 w-full"
            key={reading.id}
          >
            <div className="flex flex-row justify-center items-center rounded-l-xl">
              <div className="flex flex-col justify-center items-center px-6 sm:px-0 sm:pl-2 sm:-ml-9 md:px-0 md:pl-2 md:-ml-9 py-4 border border-r-4 border-r-green-500 border-t-0 border-l-0 border-b-0 w-28">
                <p className="font-serif text-2xl font-semibold text-center text-white md:text-left">
                  {reading.sugar_level}
                </p>
                <p className="font-serif text-sm font-thin text-center text-white md:text-left">
                  mmHg
                </p>
              </div>
              <div className="w-80 px-4 py-2">
                <p className="max-w-xs my-2 text-lg leading-6 tracking-wide text-white text-left">
                  {reading.category}
                </p>
                <p className="max-w-xs my-2 text-xs leading-4 tracking-wide text-white text-left">
                  Measure Time: {reading.measure}
                </p>
                <p className="max-w-xs my-2 text-xs leading-4 tracking-wide  text-white text-left">
                  {dayjs(reading.created_at).format("YYYY/MM/DD hh:mm A")}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DisplayBloodSugarDetails;
