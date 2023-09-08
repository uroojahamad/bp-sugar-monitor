import React from "react";
import dayjs from "dayjs";

type DisplayDetailsProps = {
  sugarReading: {
    id: number;
    sugar_level: number;
    measure: "Before Meal" | "After Meal" | "At Bedtime" | "Fasting";
    created_at: Date;
  }[];
};

const DisplayBloodSugarDetails = ({ sugarReading }: DisplayDetailsProps) => {
  return (
    <div className="border border-black max-w-5xl mx-auto p-5 flex justify-center items-center">
      {sugarReading.length > 0 && (
        <table className="min-w-full text-left text-sm font-light mt-5">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="px-6 py-4 text-xl">Date/Time</th>
              <th className="px-6 py-4 text-xl">Measure Time</th>
              <th className="px-6 py-4 text-xl">Blood Sugar Level</th>
            </tr>
          </thead>
          <tbody>
            {sugarReading.map((reading, index) => {
              return (
                <tr
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  key={reading.id}
                >
                  <td className="px-6 py-4 text-lg">
                    {dayjs(reading.created_at).format("YYYY/MM/DD hh:mm A")}
                  </td>
                  <td className="px-6 py-4 text-lg">{reading.measure}</td>
                  <td className="px-6 py-4 text-lg">
                    {reading.sugar_level}
                    <span>mg/dL</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayBloodSugarDetails;
