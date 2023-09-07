"use client";
import { supabase } from "@/supabase/client";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

type Reading = {
  id: number;
  sugar_level: number;
  measure: "Before Meal" | "After Meal" | "At Bedtime" | "Fasting";
  created_at: Date;
};

const Sugar = () => {
  const [inputState, setInputState] = useState<
    Omit<Reading, "id" | "created_at">
  >({
    sugar_level: 0,
    measure: "Before Meal",
  });

  const [sugarReading, setSugarReading] = useState<Reading[]>([]);

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
  const insertSugarData = async () => {
    const { data, error } = await supabase.from("bloodsugar").insert([
      {
        sugar_level: Number(inputState.sugar_level),
        measure: inputState.measure,
      },
    ]);

    console.log(data);
    console.log(error);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(inputState);
    console.log(Number(inputState.sugar_level));
    const currentReading = {
      currentTime: new Date(),
      ...inputState,
    };

    setSugarReading((prevReading: Reading[]) => {
      return [currentReading, ...prevReading];
    });

    setInputState({
      sugar_level: 0,
      measure: "Before Meal",
    });

    await insertSugarData();
  };

  //Get data from supabase
  const getSugarData = async () => {
    let { data, error } = await supabase.from("bloodsugar").select(`*`);
    console.log(data);
    console.log(error);
    setSugarReading(data);
  };

  useEffect(() => {
    getSugarData();
  }, []);

  return (
    <>
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border border-black p-2 max-w-lg"
            type="text"
            name="sugar_level"
            placeholder="Enter Blood Sugar Level"
            value={inputState.sugar_level === 0 ? "" : inputState.sugar_level}
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <button
              type="button"
              className={`border ${
                inputState.measure === "Before Meal"
                  ? "border-blue-800 bg-blue-100"
                  : "border-gray-700 bg-gray-100"
              }  outline-2 p-3 w-52 rounded-full text-xl`}
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
                  : "border-gray-700 bg-gray-100"
              }  outline-2 p-3 w-52 rounded-full text-xl`}
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
                  : "border-gray-700 bg-gray-100"
              }  outline-2 p-3 w-52 rounded-full text-xl`}
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
                  : "border-gray-700 bg-gray-100"
              }  outline-2 p-3 w-52 rounded-full text-xl`}
              name="measure"
              value="Fasting"
              onClick={handleChange}
            >
              Fasting
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

      {sugarReading.length > 0 && (
        <table className="min-w-fit text-left text-sm font-light mt-5">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="px-6 py-4 text-xl">Date/Time</th>
              <th className="px-6 py-4 text-xl">Measure Time</th>
              <th className="px-6 py-4 text-xl">Blood Sugar Level</th>
            </tr>
          </thead>
          <tbody>
            {sugarReading.map((reading, index) => {
              return (
                <tr
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  key={index.toString()}
                >
                  <td className="px-6 py-4 text-lg">
                    {dayjs(reading.created_at).format("YYYY/MM/DD hh:mm A")}
                  </td>
                  <td className="px-6 py-4 text-lg">{reading.measure}</td>
                  <td className="px-6 py-4 text-lg">
                    {reading.sugar_level}
                    <span>mg/dL</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Sugar;
