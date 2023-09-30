import { Reading } from "@/app/bloodsugar/page";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import React, { Dispatch, SetStateAction, useState } from "react";

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
  const supabase = createClientComponentClient();

  const [inputState, setInputState] = useState<
    Omit<Reading, "id" | "created_at" | "category">
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
    const { data, error } = await supabase.from("bloodsugar").insert([reading]);
    console.log(error);
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
        className="z-50 border border-slate-200 mx-3 w-full px-6 md:px-10 md:w-3/5 h-fit py-12 flex flex-col gap-2 justify-center items-center bg-slate-200 rounded-xl"
      >
        <h1 className="text-2xl font-bold p-2 mb-4 font-mono text-center">
          Record Blood Sugar Reading
        </h1>
        <input
          type="number"
          className="w-full p-4 border border-gray-300 rounded-md placeholder:font-mono placeholder:text-xs md:placeholder:text-sm"
          name="sugar_level"
          placeholder="Enter Blood Sugar Level"
          value={inputState.sugar_level || ""}
          onChange={handleChange}
        />
        <div className="flex gap-2 mt-5 flex-wrap justify-start items-center">
          <button
            type="button"
            className={`border ${
              inputState.measure === "Before Meal"
                ? "border-violet-800 bg-violet-100"
                : "border-slate-700 bg-gray-100 hover:bg-slate-200"
            }  outline-2 py-2 px-4 rounded-full text-md font-mono`}
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
                ? "border-violet-800 bg-violet-100"
                : "border-slate-700 bg-gray-100 hover:bg-slate-200"
            }  outline-2 py-2 px-4 rounded-full text-md font-mono`}
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
                ? "border-violet-800 bg-violet-100"
                : "border-slate-700 bg-gray-100 hover:bg-slate-200"
            }  outline-2 py-2 px-4 rounded-full text-md font-mono`}
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
                ? "border-violet-800 bg-violet-100"
                : "border-slate-700 bg-gray-100 hover:bg-slate-200"
            }  outline-2 py-2 px-4 rounded-full text-md font-mono`}
            name="measure"
            value="Fasting"
            onClick={handleChange}
          >
            Fasting
          </button>
        </div>
        <div className="mt-3 p-2 w-full flex flex-col lg:flex-row gap-2 justify-center items-center">
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

export default AddBloodSugarDetails;
