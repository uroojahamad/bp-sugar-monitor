import { Reading } from "@/app/bloodsugar/page";
import { supabase } from "@/supabase/client";
import React, { Dispatch, SetStateAction, useState } from "react";

type AddBloodSugarDetailsProps = {
  setSugarReading: Dispatch<SetStateAction<Reading[]>>;
  lastID: number;
};

const AddBloodSugarDetails = ({
  setSugarReading,
  lastID,
}: AddBloodSugarDetailsProps) => {
  const [inputState, setInputState] = useState<
    Omit<Reading, "id" | "created_at">
  >({
    sugar_level: 0,
    measure: "Before Meal",
  });

  //Get user input from fields
  const handleChange = (e: any) => {
    setInputState((prevInputState) => {
      return {
        ...prevInputState,
        [e.target.name]: e.target.value,
      };
    });
  };

  //Insert data into supabase
  const insertSugarData = async (reading: Reading) => {
    await supabase.from("bloodsugar").insert([reading]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const currentReading = {
      id: lastID + 1,
      created_at: new Date(),
      ...inputState,
    };

    setSugarReading((prevReading: Reading[]) => {
      return [currentReading, ...prevReading];
    });

    setInputState({
      sugar_level: 0,
      measure: "Before Meal",
    });

    insertSugarData(currentReading);
  };

  return (
    <>
      <div className="border w-2/4 mx-auto p-3 flex justify-center items-center shadow-md sm:rounded-lg">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            className="p-3 text-lg border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="number"
            name="sugar_level"
            placeholder="Enter Blood Sugar Level"
            value={inputState.sugar_level || ""}
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <button
              type="button"
              className={`border ${
                inputState.measure === "Before Meal"
                  ? "border-blue-800 bg-blue-100"
                  : "border-gray-700 bg-gray-100 hover:bg-green-200"
              }  outline-2 p-1 w-32 rounded-full text-md`}
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
                  : "border-gray-700 bg-gray-100 hover:bg-green-200"
              }  outline-2 p-1 w-32 rounded-full text-md`}
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
                  : "border-gray-700 bg-gray-100 hover:bg-green-200"
              }  outline-2 p-1 w-32 rounded-full text-md`}
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
                  : "border-gray-700 bg-gray-100 hover:bg-green-200"
              }  outline-2 p-1 w-32 rounded-full text-md`}
              name="measure"
              value="Fasting"
              onClick={handleChange}
            >
              Fasting
            </button>
          </div>
          <button
            type="submit"
            className="border border-black p-2 w-60 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700"
          >
            Add Readings
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBloodSugarDetails;
