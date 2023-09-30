"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React from "react";

const Login = () => {
  const loginWithGoogle = async () => {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          prompt: "consent",
        },
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-slate-300">
        <div className="relative flex flex-col m-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0 w-full md:w-2/3 h-auto">
          <div className="w-full flex flex-col md:flex-row p-6 md:p-10">
            <div className="flex flex-1">
              <Image
                src={
                  "https://cdn.hashnode.com/res/hashnode/image/upload/v1696048471333/EXN87Npl_.jpg?auto=format"
                }
                alt="login-image"
                width={1200}
                height={400}
                className="rounded-md"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center items-center gap-2 py-6 px-4 md:px-16">
              <div className="flex flex-col justify-center items-center mb-4">
                <h1 className="mb-3 text-lg md:text-2xl font-bold tracking-widest text-center">
                  Welcome to Heart Buddy Tracker
                </h1>
                <span className="text-sm md:text-lg text-center font-semibold tracking-widest text-slate-600">
                  Sign in to your account
                </span>
              </div>
              <button
                type="button"
                className="w-full flex justify-center items-center p-3 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-violet-600 shadow-violet-100 hover:bg-opacity-90 hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
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
                <span className="hidden md:block">Sign in with Google</span>
                <span className="block md:hidden">Sign in</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
