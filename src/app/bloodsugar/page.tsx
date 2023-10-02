import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BloodSugar from "@/components/bloodsugar/BloodSugar";

export type Reading = {
  id: string;
  sugar_level: number;
  measure: "Before Meal" | "After Meal" | "At Bedtime" | "Fasting";
  created_at: Date;
  category: string;
};

const Sugar = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  //Get blood sugar readings from blood suagr table in supabase
  const { data } = await supabase
    .from("bloodsugar")
    .select(`*`)
    .order("id", { ascending: false });

  return <BloodSugar session={session} bloodSugarData={data} />;
};

export default Sugar;
