"use client";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import AddBPDetails from "@/components/bloodpressure/AddBPDetails";
import DisplayBPDetails from "@/components/bloodpressure/DisplayBPDetails";
import BloodPressure from "@/components/bloodpressure/BloodPressure";
import ModalBox from "@/components/modalbox/ModalBox";
import Header from "@/components/header/Header";

export type Reading = {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number;
  arm: "Left" | "Right"; // enum
  created_at: Date;
};

export default function Home() {
  const [bpReading, setBpReading] = useState<Reading[]>([]);

  //State for Modal box
  const [isOpen, setIsOpen] = useState(false);

  const handleModalBoxOpen = () => {
    setIsOpen(true);
  };

  const handleModalBoxClose = () => {
    setIsOpen(false);
  };

  //Get blood pressure data from supabase
  const getBPData = async () => {
    const { data, error } = await supabase
      .from("bp")
      .select(`*`)
      .order("id", { ascending: false });
    if (data) setBpReading(data);
  };

  useEffect(() => {
    getBPData();
  }, []);

  return (
    <>
      <Header />
      <div className="mx-auto p-2 flex flex-col justify-center items-center bg-slate-100">
        <BloodPressure handleModalBoxOpen={handleModalBoxOpen} />
        {isOpen && (
          <ModalBox
            heading="Contact Us Via Email"
            description="Any question? Send us an email at prolog@profy.dev. We usually answer within 24 hours."
            onClose={handleModalBoxClose}
          />
        )}
      </div>
      {/* <AddBPDetails
        lastID={bpReading.slice(-1)[0]?.id || 0}
        setBpReading={setBpReading}
      />
      <DisplayBPDetails bpReading={bpReading} /> */}
      {/* <div>
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
      </div> */}
      {/* {bpReading.length > 0 && (
        <table className="min-w-fit text-left text-sm font-light mt-5">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="px-6 py-4 text-xl">Date/Time</th>
              <th className="px-6 py-4 text-xl">Systolic Pressure</th>
              <th className="px-6 py-4 text-xl">Diastolic Pressure</th>
              <th className="px-6 py-4 text-xl">Pulse Rate</th>
              <th className="px-6 py-4 text-xl">Arm</th>
            </tr>
          </thead>
          <tbody>
            {bpReading.map((reading) => {
              return (
                <tr
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  key={reading.id}
                >
                  <td className="px-6 py-4 text-lg">
                    {dayjs(reading.created_at).format("YYYY/MM/DD hh:mm A")}
                  </td>
                  <td className="px-6 py-4 text-lg">{reading.systolic}</td>
                  <td className="px-6 py-4 text-lg">{reading.diastolic}</td>
                  <td className="px-6 py-4 text-lg">{reading.pulse}</td>
                  <td className="px-6 py-4 text-lg">{reading.arm}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )} */}
    </>
  );
}
