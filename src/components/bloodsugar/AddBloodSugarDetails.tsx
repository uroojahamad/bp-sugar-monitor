import { Reading } from "@/app/bloodsugar/page";
import { supabase } from "@/supabase/client";
import { Session } from "@supabase/supabase-js";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
// import { getCurrentSession } from "../header/Header";

type AddBloodSugarDetailsProps = {
  setSugarReading: Dispatch<SetStateAction<Reading[]>>;
  lastID: number;
  onClose: () => void;
  session: Session;
};

const AddBloodSugarDetails = ({
  setSugarReading,
  lastID,
  onClose,
  session,
}: AddBloodSugarDetailsProps) => {
  const [inputState, setInputState] = useState<
    Omit<Reading, "id" | "created_at" | "category">
  >({
    sugar_level: 0,
    measure: "Before Meal",
  });

  // const [session, setSession] = useState<Session | null | undefined>(null);

  //Get user input from fields
  const handleChange = (e: any) => {
    setInputState((prevInputState) => {
      return {
        ...prevInputState,
        [e.target.name]: e.target.value,
      };
    });
  };

  // const getSession = async () => {
  //   const currentSession = await getCurrentSession();
  //   setSession(currentSession?.session);
  // };

  //Insert data into supabase
  const insertSugarData = async (reading: Reading) => {
    await supabase.from("bloodsugar").insert([reading]);
  };

  // Function to categorize blood sugar levels
  const categorizeBloodSugar = () => {
    if (inputState.sugar_level < 70) {
      return "Hypoglycemia (Low Blood Sugar)";
    } else if (inputState.sugar_level >= 70 && inputState.sugar_level <= 140) {
      return "Normal";
    } else {
      return "Hyperglycemia (High Blood Sugar)";
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const currentReading = {
      id: lastID + 1,
      created_at: new Date(),
      category: categorizeBloodSugar(),
      user_id: session?.user?.id,
      ...inputState,
    };

    setSugarReading((prevReading: Reading[]) => {
      return [currentReading, ...prevReading];
    });

    setInputState({
      sugar_level: 0,
      measure: "Before Meal",
    });

    //Modalbox close
    onClose();
    insertSugarData(currentReading);
  };

  return (
    <>
      <div
        id="innerbox"
        className="z-50 border border-black w-96 mx-6 md:w-2/5 h-fit py-3 flex flex-col gap-2 justify-center items-center bg-slate-200 rounded-xl"
      >
        <h1 className="text-2xl font-bold p-2 font-mono text-center">
          Add Blood Sugar Reading
        </h1>
        <input
          type="number"
          className="w-11/12 p-4 border border-gray-300 rounded-md placeholder:font-mono placeholder:text-xs md:placeholder:text-sm"
          name="sugar_level"
          placeholder="Enter Blood Sugar Level"
          value={inputState.sugar_level || ""}
          onChange={handleChange}
        />
        <div className="flex gap-3 mt-5 flex-wrap xl:flex-nowrap justify-center items-center">
          <button
            type="button"
            className={`border ${
              inputState.measure === "Before Meal"
                ? "border-blue-800 bg-blue-100"
                : "border-gray-700 bg-gray-100 hover:bg-green-300"
            }  outline-2 p-1 w-36 lg:w-28 rounded-full text-md font-mono`}
            name="measure"
            value="Before Meal"
            onClick={handleChange}
          >
            Before Meal
          </button>
          <button
            type="button"
            className={`border ${
              inputState.measure === "After Meal"
                ? "border-blue-800 bg-blue-100"
                : "border-gray-700 bg-gray-100 hover:bg-green-300"
            }  outline-2 p-1 w-36 lg:w-28 rounded-full text-md font-mono`}
            name="measure"
            value="After Meal"
            onClick={handleChange}
          >
            After Meal
          </button>
          <button
            type="button"
            className={`border ${
              inputState.measure === "At Bedtime"
                ? "border-blue-800 bg-blue-100"
                : "border-gray-700 bg-gray-100 hover:bg-green-300"
            }  outline-2 p-1 w-36 lg:w-28 rounded-full text-md font-mono`}
            name="measure"
            value="At Bedtime"
            onClick={handleChange}
          >
            At Bedtime
          </button>
          <button
            type="button"
            className={`border ${
              inputState.measure === "Fasting"
                ? "border-blue-800 bg-blue-100"
                : "border-gray-700 bg-gray-100 hover:bg-green-300"
            }  outline-2 p-1 w-36 lg:w-28 rounded-full text-md font-mono`}
            name="measure"
            value="Fasting"
            onClick={handleChange}
          >
            Fasting
          </button>
        </div>
        <div className="mt-3 p-2 w-11/12 flex flex-col lg:flex-row gap-2 justify-center items-center">
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

export default AddBloodSugarDetails;
