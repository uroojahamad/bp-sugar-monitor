import { supabase } from "@/supabase/client";
import Link from "next/link";
import React from "react";

const Header = () => {
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  return (
    <>
      <div className="overflow-x-hidden border">
        <nav className="container relative mx-auto p-2 flex justify-center">
          <div className="flex items-center justify-center space-x-20 my-2">
            <div>
              <h1 className="tracking-widest text-lg font-bold">
                Heart Buddy Tracker
              </h1>
            </div>
            <div className="hidden items-center space-x-10 uppercase text-grayishBlue md:flex">
              <Link href="/" className="tracking-widest hover:text-blue-400">
                Blood Pressure
              </Link>
              <Link
                href="/bloodsugar"
                className="tracking-widest hover:text-blue-400"
              >
                Blood Sugar
              </Link>
              <Link
                href="/login"
                className="px-8 py-2 text-white bg-cyan-700 border-2 border-cyan-700 rounded-lg shadow-md hover:bg-cyan-800"
              >
                Login
              </Link>
              {/* <Link
                href="/signup"
                className="px-8 py-2 text-white bg-cyan-700 border-2 border-cyan-700 rounded-lg shadow-md hover:bg-cyan-800"
              >
                Sign Up
              </Link> */}
              <button
                className="px-8 py-2 text-white bg-cyan-700 border-2 border-cyan-700 rounded-lg shadow-md hover:bg-cyan-800"
                onClick={logout}
              >
                Logout
              </button>
            </div>
            {/* <!-- Hamburger Button --> */}
            <button
              id="menu-btn"
              className="z-30 block md:hidden focus:outline-none hamburger"
            >
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>
          </div>

          <div
            id="menu"
            className="fixed inset-0 z-20 hidden flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y divide-gray-500 opacity-90 bg-veryDarkBlue"
          >
            <div className="w-full py-3 text-center">
              <Link href="/" className="block hover:text-red-400">
                Blood Pressure
              </Link>
            </div>
            <div className="w-full py-3 text-center">
              <Link href="/bloodsugar">Blood Sugar</Link>
            </div>
            <div className="w-full py-3 text-center">
              <Link href="/login" className="block hover:text-red-400">
                Login
              </Link>
            </div>
            <div className="w-full py-3 text-center">
              <Link href="/signup" className="block hover:text-red-400">
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
