import { Reading } from "@/app/page";
import dayjs from "dayjs";
import React from "react";

type DisplayBPDetailsProps = {
  bpReading: Reading[];
};

const DisplayBPDetails = ({ bpReading }: DisplayBPDetailsProps) => {
  return (
    <div>
      {bpReading.length > 0 && (
        <table className="min-w-fit text-left text-sm font-light mt-5">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="px-6 py-4 text-xl">Date/Time</th>
              <th className="px-6 py-4 text-xl">Systolic Pressure</th>
              <th className="px-6 py-4 text-xl">Diastolic Pressure</th>
              <th className="px-6 py-4 text-xl">Pulse Rate</th>
              <th className="px-6 py-4 text-xl">Arm</th>
            </tr>
          </thead>
          <tbody>
            {bpReading.map((reading) => {
              return (
                <tr
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  key={reading.id}
                >
                  <td className="px-6 py-4 text-lg">
                    {dayjs(reading.created_at).format("YYYY/MM/DD hh:mm A")}
                  </td>
                  <td className="px-6 py-4 text-lg">{reading.systolic}</td>
                  <td className="px-6 py-4 text-lg">{reading.diastolic}</td>
                  <td className="px-6 py-4 text-lg">{reading.pulse}</td>
                  <td className="px-6 py-4 text-lg">{reading.arm}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayBPDetails;
