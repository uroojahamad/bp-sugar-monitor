"use client";
import AddBloodSugarDetails from "@/components/bloodsugar/AddBloodSugarDetails";
import DisplayBloodSugarDetails from "@/components/bloodsugar/DisplayBloodSugarDetails";
import Header from "@/components/header/Header";
import ModalBox from "@/components/modalbox/ModalBox";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import BloodSugarChart from "../charts/BloodSugarChart";

export type Reading = {
  id: string;
  sugar_level: number;
  measure: "Before Meal" | "After Meal" | "At Bedtime" | "Fasting";
  created_at: Date;
  category: string;
};

const BloodSugar = ({ session, bloodSugarData }: any) => {
  const [sugarReading, setSugarReading] = useState<Reading[]>(bloodSugarData);

  //State for Modal box
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleModalBoxOpen = () => {
    setIsOpen(true);
  };

  const handleModalBoxClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <Header session={session} />
      <div className="mx-auto p-4 flex flex-col justify-center items-center bg-slate-100">
        <div
          className={`flex flex-col md:gap-1 ${
            sugarReading.length === 0
              ? "justify-center"
              : "overflow-y-auto no-scrollbar"
          } items-center h-screen bg-slate-100 rounded-2xl max-w-full max-h-full`}
        >
          {isLoading ? (
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          ) : (
            <>
              <button
                className="w-full flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-full shadow-lg px-9 bg-violet-500 shadow-violet-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150 mb-3"
                onClick={handleModalBoxOpen}
              >
                <FontAwesomeIcon icon={faPlusCircle} className="mr-4" />
                Add
              </button>
              {sugarReading.length === 0 ? (
                <div className="w-full p-5 md:p-10">
                  <div className="flex flex-col justify-between items-center gap-10">
                    <div className="text-lg font-extralight">
                      <span className="text-center block">
                        No records to show
                      </span>
                      <span>Press &quot;Add&quot; to record your reading</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-1 flex-col-reverse md:flex-row align-start md:space-x-32 m-4">
                  <div className="w-full flex flex-1 flex-col justify-center items-center md:justify-start md:items-start">
                    <DisplayBloodSugarDetails
                      sugarReading={sugarReading}
                      setSugarReading={setSugarReading}
                    />
                  </div>
                  <div className="flex flex-1 align-start mx-3 md:mx-0 md:h-96 mb-3 md:mb-0">
                    <BloodSugarChart session={session} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <ModalBox onClose={handleModalBoxClose}>
          <AddBloodSugarDetails
            setSugarReading={setSugarReading}
            onClose={handleModalBoxClose}
            session={session}
          />
        </ModalBox>
      )}
    </div>
  );
};

export default BloodSugar;
