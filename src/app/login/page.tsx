"use client";
import Login from "@/components/login/Login";
import { supabase } from "@/supabase/client";
import React, { useState } from "react";

const LoginPage = () => {
  const [currentUser, setCurrentUser] = useState({});

  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    setCurrentUser(data);
    console.log("Google signIn data : ", error);
  };

  console.log("Google signIn data : ", currentUser);

  return <Login loginWithGoogle={loginWithGoogle} />;
};

export default LoginPage;
