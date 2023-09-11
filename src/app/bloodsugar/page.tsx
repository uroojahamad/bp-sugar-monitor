"use client";
import AddBloodSugarDetails from "@/components/bloodsugar/AddBloodSugarDetails";
import BloodSugar from "@/components/bloodsugar/BloodSugar";
import DisplayBloodSugarDetails from "@/components/bloodsugar/DisplayBloodSugarDetails";
import Header from "@/components/header/Header";
import ModalBox from "@/components/modalbox/ModalBox";
import { supabase } from "@/supabase/client";
import React, { useState, useEffect } from "react";

export type Reading = {
  id: number;
  sugar_level: number;
  measure: "Before Meal" | "After Meal" | "At Bedtime" | "Fasting";
  created_at: Date;
};

const Sugar = () => {
  const [sugarReading, setSugarReading] = useState<Reading[]>([]);

  //State for Modal box
  const [isOpen, setIsOpen] = useState(false);

  const handleModalBoxOpen = () => {
    setIsOpen(true);
  };

  const handleModalBoxClose = () => {
    setIsOpen(false);
  };

  //Get data from supabase
  const getSugarData = async () => {
    const { data, error } = await supabase
      .from("bloodsugar")
      .select(`*`)
      .order("id", { ascending: false });
    if (data) setSugarReading(data);
  };

  useEffect(() => {
    getSugarData();
  }, []);

  return (
    <>
      <Header />
      <div className="mx-auto p-2 flex flex-col justify-center items-center bg-slate-100">
        <BloodSugar handleModalBoxOpen={handleModalBoxOpen} />
        {isOpen && (
          <ModalBox onClose={handleModalBoxClose}>
            <AddBloodSugarDetails
              lastID={sugarReading.slice(-1)[0]?.id || 0}
              setSugarReading={setSugarReading}
              onClose={handleModalBoxClose}
            />
          </ModalBox>
        )}

        {/* <AddBloodSugarDetails
          lastID={sugarReading.slice(-1)[0]?.id || 0}
          setSugarReading={setSugarReading}
        />
        <DisplayBloodSugarDetails sugarReading={sugarReading} /> */}
      </div>

      {/* <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="border border-black p-2 max-w-lg"
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
      </div> */}

      {/* {sugarReading.length > 0 && (
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
                  key={reading.id}
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
      )} */}
    </>
  );
};

export default Sugar;
