import { Reading } from "@/app/page";
import { supabase } from "@/supabase/client";
import React, { Dispatch, SetStateAction, useState } from "react";

type AddBPDetailsProps = {
  setBpReading: Dispatch<SetStateAction<Reading[]>>;
  lastID: number;
};

const AddBPDetails = ({ setBpReading, lastID }: AddBPDetailsProps) => {
  const [inputState, setInputState] = useState<
    Omit<Reading, "id" | "created_at">
  >({
    systolic: 0,
    diastolic: 0,
    pulse: 0,
    arm: "Left",
  });

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
      id: lastID + 1,
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
    </>
  );
};

export default AddBPDetails;
