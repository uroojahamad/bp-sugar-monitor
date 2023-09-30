"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faSignOut } from "@fortawesome/free-solid-svg-icons";

const Header = ({ session }: any) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();
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

  return (
    <>
      <div className="overflow-x-hidden border">
        <nav className="container relative mx-auto p-2 flex item-center md:justify-center">
          <div className="flex items-center justify-start md:justify-between space-x-2 md:space-x-16 my-2 sm:w-full">
            <div className="block md:hidden px-4" onClick={toggle}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h1 className="md:hidden tracking-widest text-lg font-bold">
              {pathname === "/bloodsugar" ? "Blood Sugar" : "Blood Pressure"}
            </h1>
            <div className="flex-row items-center space-x-6 hidden md:flex">
              <div className="text-center">
                <h1 className="hidden md:block tracking-widest text-lg font-bold">
                  Heart Buddy Tracker
                </h1>
              </div>
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
            </div>
            <div className="hidden md:block">
              <span className="tracking-widest text-md">
                Welcome {session?.user?.user_metadata?.name} !
              </span>
              <button className="px-4 py-2  rounded-lg " onClick={logout}>
                <FontAwesomeIcon className="mr-4" icon={faSignOut} />
              </button>
            </div>
          </div>
          <div
            id="menu"
            className={`fixed inset-0 z-20 ${
              isOpen ? "flex" : "hidden"
            } flex-col items-center self-end text-lg w-full min-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-white divide-y-2 divide-gray-500 opacity-90 bg-gray-900`}
          >
            <div className="absolute top-0 right-0 p-4">
              <FontAwesomeIcon icon={faClose} onClick={toggle} />
            </div>
            <div className="w-full py-3 text-center">
              <h1 className="text-violet-500 font-bold text-lg">
                {session
                  ? `Hello ${session?.user?.user_metadata?.name}`
                  : `Heart Buddy Tracker`}
              </h1>
            </div>
            <div className="w-full py-3 text-center">
              <Link href="/" className="block hover:text-red-400 text-base">
                Blood Pressure
              </Link>
            </div>
            <div className="w-full py-3 text-center text-base">
              <Link href="/bloodsugar">Blood Sugar</Link>
            </div>
            <div className="w-full py-3 flex justify-center items-center text-base">
              <FontAwesomeIcon className="mr-4" icon={faSignOut} />
              <button className="block hover:text-red-400" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
