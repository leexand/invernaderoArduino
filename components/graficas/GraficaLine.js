'use client'

import { Line } from "react-chartjs-2";
import { Chart as CharJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

CharJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function GraficaLine({ data }) {

  const router = useRouter()
  
  return (
    <Line
      id="myChart"
      data={data}
      width="100%"
      height="100%"
      options={{
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 0
      }}
    />
  )
}
