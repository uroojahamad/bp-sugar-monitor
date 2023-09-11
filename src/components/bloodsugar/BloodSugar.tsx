import React from "react";

type BloodSugarProps = {
  handleModalBoxOpen: () => void;
};

const BloodSugar = ({ handleModalBoxOpen }: BloodSugarProps) => {
  return (
    <>
      <div className="w-screen md:w-2/4 flex flex-col items-center justify-center min-h-screen ">
        <div className="flex flex-col m-4 space-y-2 shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0 w-11/12 min-h-screen bg-slate-100 justify-center items-center">
          <div className="w-full p-5 md:p-10">
            <div className="flex flex-col justify-between items-center gap-10">
              <div className="text-lg font-extralight">
                <p className="text-center">No records to show</p>
                <p>Press + to add your records</p>
              </div>
              <button
                className="w-2/4 flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                onClick={handleModalBoxOpen}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodSugar;
