// import { useState, useEffect } from "react";
// import { supabase } from "@/supabase/client";
// import AddBPDetails from "@/components/bloodpressure/AddBPDetails";
// import DisplayBPDetails from "@/components/bloodpressure/DisplayBPDetails";
// import ModalBox from "@/components/modalbox/ModalBox";
// import Header from "@/components/header/Header";

import BloodPressure from "@/components/bloodpressure/BloodPressure";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Reading = {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number;
  arm: "Left" | "Right";
  created_at: Date;
  category: string;
};

export default async function Home() {
  // const [bpReading, setBpReading] = useState<Reading[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  // //State for Modal box
  // const [isOpen, setIsOpen] = useState(false);

  // const handleModalBoxOpen = () => {
  //   setIsOpen(true);
  // };

  // const handleModalBoxClose = () => {
  //   setIsOpen(false);
  // };

  // //Get blood pressure data from supabase
  // const getBPData = async () => {
  //   setIsLoading(true);
  //   const { data } = await supabase
  //     .from("bp")
  //     .select(`*`)
  //     .order("id", { ascending: false });
  //   if (data) setBpReading(data);
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   getBPData();
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
    <BloodPressure session={session} />

    // <div className="w-full">
    //   <Header />
    //   <div className="mx-auto p-2 flex flex-col justify-center items-center bg-slate-100">
    //     <div
    //       className={`flex flex-col md:gap-1 ${
    //         bpReading.length === 0
    //           ? "justify-center"
    //           : "overflow-y-auto no-scrollbar"
    //       } items-center h-screen bg-slate-100 rounded-2xl max-w-full max-h-full p-3`}
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
    //           {bpReading.length === 0 ? (
    //             <div className="w-full p-5 md:p-10">
    //               <div className="flex flex-col justify-between items-center gap-10">
    //                 <div className="text-lg font-extralight">
    //                   <p className="text-center">No records to show</p>
    //                   <p>Press + to add your records</p>
    //                 </div>
    //               </div>
    //             </div>
    //           ) : (
    //             <DisplayBPDetails bpReading={bpReading} />
    //           )}
    //         </>
    //       )}
    //     </div>
    //   </div>
    //   {isOpen && (
    //     <ModalBox onClose={handleModalBoxClose}>
    //       <AddBPDetails
    //         lastID={bpReading[0]?.id || 0}
    //         setBpReading={setBpReading}
    //         onClose={handleModalBoxClose}
    //       />
    //     </ModalBox>
    //   )}
    // </div>
  );
}
