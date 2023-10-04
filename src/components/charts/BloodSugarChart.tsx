"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { generateChartData } from "@/utils/generateChartData";
import { Session } from "@supabase/supabase-js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BloodSugarChart = ({ session }: { session: Session }) => {
  const [bsRecords, setBsRecords] = useState([]);

  const getBsRecords = async () => {
    const response = await fetch(
      `https://scattered-violet.cmd.outerbase.io/bs-chart?user_id=${session?.user?.id}`
    );
    const result = await response.json();
    setBsRecords(result?.response?.items);
  };

  useEffect(() => {
    getBsRecords();
  }, []);

  const data = generateChartData(bsRecords);

  if (bsRecords.length === 0) {
    return null;
  }

  return (
    <Pie
      data={data}
      width={200}
      height={200}
      options={{ maintainAspectRatio: false }}
    />
  );
};

export default BloodSugarChart;
