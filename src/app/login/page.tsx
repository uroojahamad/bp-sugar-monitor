import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Login from "@/components/login/Login";

const LoginPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }
  return <Login />;
};

export default LoginPage;
