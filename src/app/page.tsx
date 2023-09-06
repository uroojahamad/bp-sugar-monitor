"use client";
import dayjs from "dayjs";
import { useState } from "react";

type Reading = {
  systolic: string;
  diastolic: string;
  pulse: string;
  arm: "Left" | "Right"; // enum
};

type BPReading = Reading & { currentTime: string };

export default function Home() {
  const [inputState, setInputState] = useState<Reading>({
    systolic: "",
    diastolic: "",
    pulse: "",
    arm: "Left",
  });

  // const [bpReading, setBpReading] = useState<Reading[]>([]);
  const [bpReading, setBpReading] = useState<BPReading[]>([]);

  //Get user input from fields
  const handleChange = (e: any) => {
    setInputState((prevInputState) => {
      return { ...prevInputState, [e.target.name]: e.target.value };
    });
  };

  //Submit the details
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      inputState.systolic === "" ||
      inputState.diastolic === "" ||
      inputState.pulse === ""
    ) {
      return alert("Enter all reading to add the details.");
    }

    const currentReading = {
      currentTime: dayjs().format("YYYY/MM/DD hh:mm A"),
      ...inputState,
    };

    setBpReading((prevReading: BPReading[]) => {
      return [currentReading, ...prevReading];
    });

    setInputState({
      systolic: "",
      diastolic: "",
      pulse: "",
      arm: "Left",
    });
  };

  return (
    <>
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border border-black p-2 max-w-lg"
            type="text"
            name="systolic"
            placeholder="Enter Systolic Pressure"
            value={inputState.systolic}
            onChange={handleChange}
          />
          <input
            className="border border-black p-2 max-w-lg"
            type="text"
            name="diastolic"
            placeholder="Enter Diastolic Pressure"
            value={inputState.diastolic}
            onChange={handleChange}
          />
          <input
            className="border border-black p-2 max-w-lg"
            type="text"
            name="pulse"
            placeholder="Enter Pulse reading"
            value={inputState.pulse}
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
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="px-6 py-4">Date/Time</th>
              <th className="px-6 py-4">Systolic Pressure</th>
              <th className="px-6 py-4">Diastolic Pressure</th>
              <th className="px-6 py-4">Pulse Rate</th>
              <th className="px-6 py-4">Arm</th>
            </tr>
          </thead>
          <tbody>
            {bpReading.map((reading, index) => {
              return (
                <tr
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  key={index.toString()}
                >
                  <td className="px-6 py-4 text-lg">{reading.currentTime}</td>
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
