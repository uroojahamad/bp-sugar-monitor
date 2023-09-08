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
    <div className="w-2/4 overflow-x-auto shadow-md sm:rounded-lg mt-4">
      {sugarReading.length > 0 && (
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-lg text-gray-700 bg-blue-300 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4">Date/Time</th>
              <th className="px-6 py-4">Measure Time</th>
              <th className="px-6 py-4">Blood Sugar Level</th>
            </tr>
          </thead>
          <tbody>
            {sugarReading.map((reading, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  key={reading.id}
                >
                  <td className="px-6 py-4 text-md">
                    {dayjs(reading.created_at).format("YYYY/MM/DD hh:mm A")}
                  </td>
                  <td className="px-6 py-4 text-md">{reading.measure}</td>
                  <td className="px-6 py-4 text-md">
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
