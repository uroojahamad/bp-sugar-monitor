"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { generateChartData } from "@/utils/generateChartData";
import { Session } from "@supabase/supabase-js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BloodPressureChart = ({ session }: { session: Session }) => {
  const [bpRecords, setBpRecords] = useState([]);

  const getBpRecords = async () => {
    const response = await fetch(
      `https://scattered-violet.cmd.outerbase.io/bp-chart?user_id=${session?.user?.id}`
    );
    const result = await response.json();
    setBpRecords(result?.response?.items);
  };

  useEffect(() => {
    getBpRecords();
  }, []);

  const data = generateChartData(bpRecords);

  if (bpRecords.length === 0) {
    return null;
  }

  return (
    <Pie
      data={data}
      width={250}
      height={250}
      options={{ maintainAspectRatio: false }}
    />
  );
};

export default BloodPressureChart;
