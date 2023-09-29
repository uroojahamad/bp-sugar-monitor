import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BloodPressure from "@/components/bloodpressure/BloodPressure";

export type Reading = {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number;
  arm: "Left" | "Right";
  created_at: Date;
  category: string;
};

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  //Get blood pressure reading from bp table in supabase
  const { data } = await supabase
    .from("bp")
    .select(`*`)
    .order("id", { ascending: false });

  return <BloodPressure session={session} bpData={data} />;
}
