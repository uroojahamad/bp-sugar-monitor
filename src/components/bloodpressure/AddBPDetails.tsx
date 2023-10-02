import { Reading } from "@/app/page";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";

type AddBPDetailsProps = {
  setBpReading: Dispatch<SetStateAction<Reading[]>>;
  // lastID: number;
  onClose: () => void;
  session: Session;
};

const AddBPDetails = ({
  setBpReading,
  // lastID,
  onClose,
  session,
}: AddBPDetailsProps) => {
  const supabase = createClientComponentClient();

  const [inputState, setInputState] = useState<
    Omit<Reading, "id" | "created_at" | "category">
  >({
    systolic: 0,
    diastolic: 0,
    pulse: 0,
    arm: "Left",
  });

  const handleChange = (e: any) => {
    setInputState((prevInputState) => {
      return { ...prevInputState, [e.target.name]: e.target.value };
    });
  };

  //Insert data into supabase
  const insertBPData = async (reading: Reading) => {
    const { data, error } = await supabase.from("bp").insert([reading]);
    console.log(error);
    console.log(data);
  };

  //Check BP Category
  const calculateCategory = () => {
    if (inputState.systolic < 90 || inputState.diastolic < 60) {
      return "Hypotension (Low Blood Pressure)";
    } else if (
      inputState.systolic >= 90 &&
      inputState.systolic <= 120 &&
      inputState.diastolic >= 60 &&
      inputState.diastolic <= 80
    ) {
      return "Normal Blood Pressure";
    } else if (inputState.systolic <= 129 && inputState.diastolic <= 84) {
      return "Elevated Blood Pressure";
    } else if (inputState.systolic <= 139 || inputState.diastolic <= 89) {
      return "Stage 1 Hypertension";
    } else {
      return "Stage 2 Hypertension";
    }
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
      id: uuidv4(),
      created_at: new Date(),
      category: calculateCategory(),
      user_id: session?.user?.id,
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
    console.log(currentReading);
    insertBPData(currentReading);
  };

  return (
    <>
      <div
        id="innerbox"
        className="z-50 border border-slate-200 mx-8 w-96 px-6 md:px-10 md:w-2/5 h-fit py-12 flex flex-col gap-2 justify-center items-center bg-slate-200 rounded-xl"
      >
        <h1 className="text-2xl font-bold p-2 mb-4 font-mono text-center">
          Record BP Reading
        </h1>
        <input
          type="number"
          className="w-full p-4 border border-gray-300 rounded-md placeholder:font-mono placeholder:text-xs md:placeholder:text-sm"
          name="systolic"
          placeholder="Enter Systolic Pressure"
          value={inputState.systolic || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          className="w-full p-4 border border-gray-300 rounded-md placeholder:font-mono placeholder:text-xs md:placeholder:text-sm"
          name="diastolic"
          placeholder="Enter Diastolic Pressure"
          value={inputState.diastolic || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          className="w-full p-4 border border-gray-300 rounded-md placeholder:font-mono placeholder:text-xs md:placeholder:text-sm"
          name="pulse"
          placeholder="Enter Pulse reading"
          value={inputState.pulse || ""}
          onChange={handleChange}
        />
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            className={`border ${
              inputState.arm === "Left"
                ? "border-violet-800 bg-violet-100"
                : "border-slate-700 bg-gray-100 hover:bg-slate-200"
            }  outline-2 p-2 w-36 md:w-32 lg:w-40 rounded-full text-md font-mono`}
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
                ? "border-violet-800 bg-violet-100"
                : "border-slate-700 bg-gray-100 hover:bg-slate-200"
            }  outline-2 p-2 w-36 md:w-32 lg:w-40 rounded-full text-md font-mono`}
            name="arm"
            value="Right"
            onClick={handleChange}
          >
            Right Arm
          </button>
        </div>
        <div className="mt-8 p-2 w-full flex flex-col lg:flex-row gap-2 justify-center items-center">
          <button
            className="w-full flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 md:px-0 bg-red-500 shadow-violet-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-full flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 md:px-0 bg-violet-700 shadow-violet-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
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
