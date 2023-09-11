import { Reading } from "@/app/bloodsugar/page";
import { supabase } from "@/supabase/client";
import React, { Dispatch, SetStateAction, useState } from "react";

type AddBloodSugarDetailsProps = {
  setSugarReading: Dispatch<SetStateAction<Reading[]>>;
  lastID: number;
  onClose: () => void;
};

const AddBloodSugarDetails = ({
  setSugarReading,
  lastID,
  onClose,
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

    // insertSugarData(currentReading);
  };

  return (
    <>
      <div
        id="innerbox"
        className="z-50 border border-black w-2/5 h-72 flex flex-col gap-2 justify-center items-center bg-slate-200 rounded-xl"
      >
        <h1 className="text-2xl font-bold p-2 font-mono">
          Add Blood Sugar Reading
        </h1>
        <input
          type="number"
          className="w-3/4 p-4 border border-gray-300 rounded-md placeholder:font-mono"
          name="sugar_level"
          placeholder="Enter Blood Sugar Level"
          value={inputState.sugar_level || ""}
          onChange={handleChange}
        />
        <div className="flex gap-3 mt-5">
          <button
            type="button"
            className={`border ${
              inputState.measure === "Before Meal"
                ? "border-blue-800 bg-blue-100"
                : "border-gray-700 bg-gray-100 hover:bg-green-300"
            }  outline-2 p-1 w-28 rounded-full text-md font-mono`}
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
            }  outline-2 p-1 w-28 rounded-full text-md font-mono`}
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
            }  outline-2 p-1 w-28 rounded-full text-md font-mono`}
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
            }  outline-2 p-1 w-28 rounded-full text-md font-mono`}
            name="measure"
            value="Fasting"
            onClick={handleChange}
          >
            Fasting
          </button>
        </div>
        <div className="mt-3 p-2 w-4/5 flex gap-2 justify-center items-center">
          <button
            className="w-full flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-red-500 shadow-cyan-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="w-full flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150">
            Add Record
          </button>
        </div>
      </div>

      {/* <div className="border w-2/4 mx-auto p-3 flex justify-center items-center shadow-md sm:rounded-lg">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold text-center font-sans">
            Blood Sugar Records
          </h2>
          <input
            className="p-3 text-md border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:font-sans"
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
              }  outline-2 p-1 w-32 rounded-full text-md font-sans`}
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
              }  outline-2 p-1 w-32 rounded-full text-md font-sans`}
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
              }  outline-2 p-1 w-32 rounded-full text-md font-sans`}
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
              }  outline-2 p-1 w-32 rounded-full text-md font-sans`}
              name="measure"
              value="Fasting"
              onClick={handleChange}
            >
              Fasting
            </button>
          </div>
          <button
            type="submit"
            className="border border-black p-2 w-60 bg-cyan-700 text-white rounded-md text-lg hover:bg-cyan-800 font-sans"
          >
            Add Readings
          </button>
        </form>
      </div> */}
    </>
  );
};

export default AddBloodSugarDetails;
