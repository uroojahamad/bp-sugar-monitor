"use client";
import { supabase } from "@/supabase/client";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentUser, setCurrentUser] = useState<Session | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const authStateChange = async () => {
    try {
      supabase.auth.onAuthStateChange((event, session) => {
        setCurrentUser(session);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authStateChange();
  }, []);

  console.log("Current user : ", currentUser);
  console.log(pathname);
  return (
    <>
      <div className="overflow-x-hidden border">
        <nav className="container relative mx-auto p-2 flex item-center md:justify-center">
          <div className="flex items-center justify-center md:justify-between space-x-9 md:space-x-16 my-2 sm:w-full">
            {/* <!-- Hamburger Button --> */}
            <button
              id="menu-btn"
              className="z-30 block md:hidden focus:outline-none hamburger ml-3"
              onClick={toggle}
            >
              <span className="hamburger-top"></span>
              <span className="hamburger-middle"></span>
              <span className="hamburger-bottom"></span>
            </button>

            {/* Heading */}
            <div>
              <h1 className="tracking-widest text-lg font-bold">
                Heart Buddy Tracker
              </h1>
            </div>
            <div className="hidden items-center space-x-10 uppercase md:flex p-1">
              <Link
                href="/"
                className={`tracking-widest hover:text-blue-400 ${
                  pathname === "/"
                    ? "text-violet-900 font-bold underline"
                    : "text-black"
                }`}
              >
                Blood Pressure
              </Link>
              <Link
                href="/bloodsugar"
                className={`tracking-widest hover:text-blue-400 ${
                  pathname === "/bloodsugar"
                    ? "text-violet-900 font-bold underline"
                    : "text-black"
                }`}
              >
                Blood Sugar
              </Link>

              {!currentUser ? (
                <Link
                  href="/login"
                  className="px-8 py-2 text-white bg-cyan-700 border-2 border-cyan-700 rounded-lg shadow-md hover:bg-cyan-800"
                >
                  Login
                </Link>
              ) : (
                <>
                  <h2 className="tracking-widest text-sm">
                    Welcome {currentUser?.user?.user_metadata?.name} !
                  </h2>
                  <button
                    className="px-8 py-2 text-white bg-cyan-700 border-2 border-cyan-700 rounded-lg shadow-md hover:bg-cyan-800"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          <div
            id="menu"
            className={`fixed inset-0 z-20 ${
              isOpen ? "flex" : "hidden"
            } flex-col items-center self-end text-lg w-full min-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white uppercase divide-y-2 divide-gray-500 opacity-90 bg-gray-900`}
          >
            {currentUser && (
              <div className="w-full py-3 text-center">
                <h2 className="tracking-widest text-sm">
                  Welcome {currentUser?.user?.user_metadata?.name} !
                </h2>
              </div>
            )}
            <div className="w-full py-3 text-center">
              <Link href="/" className="block hover:text-red-400">
                Blood Pressure
              </Link>
            </div>
            <div className="w-full py-3 text-center">
              <Link href="/bloodsugar">Blood Sugar</Link>
            </div>
            {!currentUser ? (
              <div className="w-full py-3 text-center">
                <Link href="/login" className="block hover:text-red-400">
                  Login
                </Link>
              </div>
            ) : (
              <div className="w-full py-3 flex justify-center items-center">
                <button className="block hover:text-red-400" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
