// import { supabase } from "@/supabase/client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
// import Link from "next/link";
import React, { useState } from "react";

const Login = () => {
  const loginWithGoogle = async () => {
    //supabase client from supabase auth helper
    console.log(location.origin);
    return;
    const supabase = createClientComponentClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        //redirect to
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-slate-200">
        {/* <!-- Card Container --> */}
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0 w-96 max-h-fit">
          <div className="w-full p-6 md:p-10">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={require("/src/images/anonymous-avatar-icon-25.jpg")}
                  alt="default-profile-image"
                  width={64}
                  height={64}
                  className="rounded-full mb-3"
                />
                <h1 className="mb-3 text-xl font-bold tracking-widest text-center">
                  Welcome Back
                  <br />
                  <span className="text-lg font-bold tracking-widest">
                    Sign In to your account
                  </span>
                </h1>
              </div>

              <button
                type="button"
                className="w-full flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                onClick={loginWithGoogle}
              >
                <svg
                  className="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </button>

              {/* <div className="my-2 tracking-widest font-light text-sm">
                ----------------- or -----------------
              </div>
              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-md placeholder:font-sans"
                placeholder="Enter your email address"
              />
              <input
                type="password"
                className="w-full p-4 border border-gray-300 rounded-md placeholder:font-sans"
                placeholder="Enter your password"
              />
              <button className="w-full flex justify-center items-center p-2 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150">
                <span>Sign In</span>
              </button>

              <div className="w-100 text-center mt-3 font-medium hover:text-cyan-700  cursor-pointer hover:underline">
                Forgot password
              </div>
              <div className="w-100 text-center font-medium flex gap-2">
                <span>Create a new account ?</span>
                <Link href="/signup" className="text-blue-800 text underline">
                  Sign Up
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
