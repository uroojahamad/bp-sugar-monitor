"use client";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";

type Reading = {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number;
  arm: "Left" | "Right"; // enum
  created_at: Date;
};

export default function Home() {
  const [inputState, setInputState] = useState<
    Omit<Reading, "id" | "created_at">
  >({
    systolic: 0,
    diastolic: 0,
    pulse: 0,
    arm: "Left",
  });

  const [bpReading, setBpReading] = useState<Reading[]>([]);

  //Get user input from fields
  const handleChange = (e: any) => {
    setInputState((prevInputState) => {
      return { ...prevInputState, [e.target.name]: e.target.value };
    });
  };

  //Insert data into supabase
  const insertBPData = async (reading: Reading) => {
    await supabase.from("bp").insert([reading]);
  };

  //Submit the details
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      inputState.systolic === 0 ||
      inputState.diastolic === 0 ||
      inputState.pulse === 0
    ) {
      return alert("Enter all reading to add the details.");
    }

    const currentReading = {
      id: (bpReading.slice(-1)[0]?.id || 0) + 1,
      created_at: new Date(),
      ...inputState,
    };

    setBpReading((prevReading: Reading[]) => {
      return [currentReading, ...prevReading];
    });

    setInputState({
      systolic: 0,
      diastolic: 0,
      pulse: 0,
      arm: "Left",
    });

    insertBPData(currentReading);
  };

  //Get blood pressure data from supabase
  const getBPData = async () => {
    const { data, error } = await supabase.from("bp").select(`*`);
    if (data) setBpReading(data);
  };

  useEffect(() => {
    getBPData();
  }, []);

  return (
    <>
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border border-black p-2 max-w-lg"
            type="number"
            name="systolic"
            placeholder="Enter Systolic Pressure"
            value={inputState.systolic || ""}
            onChange={handleChange}
          />
          <input
            className="border border-black p-2 max-w-lg"
            type="number"
            name="diastolic"
            placeholder="Enter Diastolic Pressure"
            value={inputState.diastolic || ""}
            onChange={handleChange}
          />
          <input
            className="border border-black p-2 max-w-lg"
            type="number"
            name="pulse"
            placeholder="Enter Pulse reading"
            value={inputState.pulse || ""}
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <button
              type="button"
              className={`border ${
                inputState.arm === "Left"
                  ? "border-blue-800 bg-blue-100"
                  : "border-gray-700 bg-gray-100"
              }  outline-2 p-3 w-52 rounded-full text-xl`}
              name="arm"
              value="Left"
              onClick={handleChange}
            >
              Left Arm
            </button>
            <button
              type="button"
              className={`border ${
                inputState.arm === "Right"
                  ? "border-blue-800 bg-blue-100"
                  : "border-gray-700 bg-gray-100"
              }  outline-2 p-3 w-52 rounded-full text-xl`}
              name="arm"
              value="Right"
              onClick={handleChange}
            >
              Right Arm
            </button>
          </div>
          <button
            type="submit"
            className="border border-black p-2 max-w-md bg-blue-600 text-white"
          >
            Add Readings
          </button>
        </form>
      </div>
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
    </>
  );
}
