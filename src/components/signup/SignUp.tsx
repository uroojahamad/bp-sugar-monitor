import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-slate-200">
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0 border border-black w-96">
          <div className="w-full p-6 md:p-10">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={require("/src/images/anonymous-avatar-icon-25.jpg")}
                  alt="default-profile-image"
                  width={64}
                  height={64}
                  className="rounded-full mb-3"
                />
                <h1 className="mb-3 text-xl font-bold tracking-widest">
                  Sign Up
                </h1>
              </div>
              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-md placeholder:font-sans"
                placeholder="Enter your email address"
                name="email"
              />
              <input
                type="password"
                className="w-full p-4 border border-gray-300 rounded-md placeholder:font-sans"
                placeholder="Enter your password"
                name="password"
              />
              <input
                type="password"
                className="w-full p-4 border border-gray-300 rounded-md placeholder:font-sans"
                placeholder="Confirm your password"
                name="confirmPassword"
              />
              <button className="w-full flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150">
                <span>Sign Up</span>
              </button>

              <div className="w-100 text-center mt-3 font-medium flex gap-2">
                <span>Already have an account ?</span>
                <Link href="/login" className="text-blue-800 text underline">
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
