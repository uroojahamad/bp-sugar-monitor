// import AddBloodSugarDetails from "@/components/bloodsugar/AddBloodSugarDetails";
// import DisplayBloodSugarDetails from "@/components/bloodsugar/DisplayBloodSugarDetails";
// import Header from "@/components/header/Header";
// import ModalBox from "@/components/modalbox/ModalBox";
// import { supabase } from "@/supabase/client";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState, useEffect } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BloodSugar from "@/components/bloodsugar/BloodSugar";

export type Reading = {
  id: number;
  sugar_level: number;
  measure: "Before Meal" | "After Meal" | "At Bedtime" | "Fasting";
  created_at: Date;
  category: string;
};

const Sugar = async () => {
  // const [sugarReading, setSugarReading] = useState<Reading[]>([]);

  // //State for Modal box
  // const [isOpen, setIsOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // const handleModalBoxOpen = () => {
  //   setIsOpen(true);
  // };

  // const handleModalBoxClose = () => {
  //   setIsOpen(false);
  // };

  //Get data from supabase
  // const getSugarData = async () => {
  //   setIsLoading(true);
  //   const { data, error } = await supabase
  //     .from("bloodsugar")
  //     .select(`*`)
  //     .order("id", { ascending: false });
  //   if (data) setSugarReading(data);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   getSugarData();
  // }, []);

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  console.log(session);

  if (!session) {
    redirect("/login");
  }

  return (
    <BloodSugar session={session} />

    // <div className="w-full">
    //   <Header />
    //   <div className="mx-auto p-4 flex flex-col justify-center items-center bg-slate-100">
    //     <div
    //       className={`flex flex-col md:gap-1 ${
    //         sugarReading.length === 0
    //           ? "justify-center"
    //           : "overflow-y-auto no-scrollbar"
    //       } items-center h-screen bg-slate-100 rounded-2xl max-w-full max-h-full`}
    //     >
    //       {isLoading ? (
    //         <div
    //           className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    //           role="status"
    //         >
    //           <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
    //             Loading...
    //           </span>
    //         </div>
    //       ) : (
    //         <>
    //           <button
    //             className="w-full flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-full shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150 mb-3"
    //             onClick={handleModalBoxOpen}
    //           >
    //             Add
    //           </button>

    //           {sugarReading.length === 0 ? (
    //             <div className="w-full p-5 md:p-10">
    //               <div className="flex flex-col justify-between items-center gap-10">
    //                 <div className="text-lg font-extralight">
    //                   <p className="text-center">No records to show</p>
    //                   <p>Press + to add your records</p>
    //                 </div>
    //               </div>
    //             </div>
    //           ) : (
    //             <DisplayBloodSugarDetails sugarReading={sugarReading} />
    //           )}
    //         </>
    //       )}
    //     </div>
    //   </div>
    //   {isOpen && (
    //     <ModalBox onClose={handleModalBoxClose}>
    //       <AddBloodSugarDetails
    //         lastID={sugarReading[0]?.id || 0}
    //         setSugarReading={setSugarReading}
    //         onClose={handleModalBoxClose}
    //       />
    //     </ModalBox>
    //   )}
    // </div>
  );
};

export default Sugar;
