import { Reading } from "@/app/page";
import { supabase } from "@/supabase/client";
import React, { Dispatch, SetStateAction, useState } from "react";

type AddBPDetailsProps = {
  setBpReading: Dispatch<SetStateAction<Reading[]>>;
  lastID: number;
  onClose: () => void;
};

const AddBPDetails = ({ setBpReading, lastID, onClose }: AddBPDetailsProps) => {
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

    //Modal box close
    onClose();

    insertBPData(currentReading);
  };
  return (
    <>
      <div
        id="innerbox"
        className="z-50 border border-black w-72 md:w-2/5 h-fit py-3 flex flex-col gap-2 justify-center items-center bg-slate-200 rounded-xl"
      >
        <h1 className="text-2xl font-bold p-2 font-mono text-center">
          Add Blood Pressure Reading
        </h1>
        <input
          type="number"
          className="w-3/4 p-4 border border-gray-300 rounded-md placeholder:font-mono placeholder:text-xs md:placeholder:text-sm"
          name="systolic"
          placeholder="Enter Systolic Pressure"
          value={inputState.systolic || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          className="w-3/4 p-4 border border-gray-300 rounded-md placeholder:font-mono placeholder:text-xs md:placeholder:text-sm"
          name="diastolic"
          placeholder="Enter Diastolic Pressure"
          value={inputState.diastolic || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          className="w-3/4 p-4 border border-gray-300 rounded-md placeholder:font-mono placeholder:text-xs md:placeholder:text-sm"
          name="pulse"
          placeholder="Enter Pulse reading"
          value={inputState.pulse || ""}
          onChange={handleChange}
        />
        <div className="flex gap-3 mt-5">
          <button
            type="button"
            className={`border ${
              inputState.arm === "Left"
                ? "border-blue-800 bg-blue-100"
                : "border-gray-700 bg-gray-100 hover:bg-green-300"
            }  outline-2 p-2 w-28 md:w-32 lg:w-40 rounded-full text-md font-mono`}
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
                : "border-gray-700 bg-gray-100 hover:bg-green-300"
            }  outline-2 p-2 w-28 md:w-32 lg:w-40 rounded-full text-md font-mono`}
            name="arm"
            value="Right"
            onClick={handleChange}
          >
            Right Arm
          </button>
        </div>
        <div className="mt-3 p-2 w-4/5 flex flex-col lg:flex-row gap-2 justify-center items-center">
          <button
            className="w-full flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 md:px-0 bg-red-500 shadow-cyan-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-full flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 md:px-0 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
            onClick={handleSubmit}
          >
            Add Record
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBPDetails;
