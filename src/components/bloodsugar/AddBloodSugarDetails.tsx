import React from "react";

type AddDetailsProps = {
  inputState: {
    sugar_level: number;
    measure: "Before Meal" | "After Meal" | "At Bedtime" | "Fasting";
  };
  handleSubmit: (e: any) => void;
  handleChange: (e: any) => void;
};

const AddBloodSugarDetails = ({
  inputState,
  handleSubmit,
  handleChange,
}: AddDetailsProps) => {
  console.log(inputState);
  return (
    <>
      <div className="border border-black max-w-5xl mx-auto p-5 flex justify-center items-center">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            className="p-2 w-11/12 rounded border bg-transparent leading-[1.6] outline-none text-lg"
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
              }  outline-2 p-3 w-40 rounded-full text-xl`}
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
              }  outline-2 p-3 w-40 rounded-full text-xl`}
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
              }  outline-2 p-3 w-40 rounded-full text-xl`}
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
              }  outline-2 p-3 w-40 rounded-full text-xl`}
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
