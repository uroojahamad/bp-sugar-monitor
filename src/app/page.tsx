"use client";
import dayjs from "dayjs";
import { useState } from "react";

type Reading = {
  systolic: string;
  diastolic: string;
  pulse: string;
  arm: "left" | "right"; // enum
};

type CurrentReading = Reading & { currentTime: string };

export default function Home() {
  const [inputState, setInputState] = useState<Reading>({
    systolic: "",
    diastolic: "",
    pulse: "",
    arm: "left",
  });

  // const [bpReading, setBpReading] = useState<Reading[]>([]);
  const [bpReading, setBpReading] = useState<CurrentReading[]>([]);

  //Get user input from fields
  // const handleChange = (e: any) => {
  //   setInputState((prevInputState) => {
  //     return { ...prevInputState, [e.target.name]: e.target.value };
  //   });
  // };

  const handleChange = (e: any) => {
    setInputState((prevInputState) => {
      if (e.target.name === "arm") {
        const value = e.target.value;
        return {
          ...prevInputState,
          [e.target.name]: value.charAt(0).toUpperCase() + value.slice(1),
        };
      }
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

    setBpReading((prevReading: CurrentReading[]) => {
      // return [inputState, ...prevReading];
      return [currentReading, ...prevReading];
    });

    setInputState({
      systolic: "",
      diastolic: "",
      pulse: "",
      arm: "left",
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
                inputState.arm === "left"
                  ? "border-blue-800 bg-blue-100"
                  : "border-gray-700 bg-gray-100"
              }  outline-2 p-3 w-52 rounded-full text-xl`}
              name="arm"
              value="left"
              onClick={handleChange}
            >
              Left Arm
            </button>
            <button
              type="button"
              className={`border ${
                inputState.arm === "right"
                  ? "border-blue-800 bg-blue-100"
                  : "border-gray-700 bg-gray-100"
              }  outline-2 p-3 w-52 rounded-full text-xl`}
              name="arm"
              value="right"
              onClick={handleChange}
            >
              Right Arm
            </button>
          </div>
          <button
            type="submit"
            className="border border-black p-2 max-w-md bg-sky-700"
          >
            Add Readings
          </button>
        </form>
      </div>
      {bpReading.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Systolic Pressure</th>
              <th>Diastolic Pressure</th>
              <th>Pulse Rate</th>
              <th>Arm</th>
            </tr>
          </thead>
          <tbody>
            {bpReading.map((reading, index) => {
              console.log(reading);
              return (
                <tr key={index.toString()}>
                  <td>{reading.currentTime}</td>
                  <td>{reading.systolic}</td>
                  <td>{reading.diastolic}</td>
                  <td>{reading.pulse}</td>
                  <td>
                    {reading.arm.charAt(0).toUpperCase() + reading.arm.slice(1)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
