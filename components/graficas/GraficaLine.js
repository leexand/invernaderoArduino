'use client'

import { Line } from "react-chartjs-2";
import { Chart as CharJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { timeNormalize } from "@/utils/normalizeData";

CharJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function GraficaLine({ data }) {

  useEffect(() => {
    setInterval(() => {
      const char = CharJS.getChart(document.getElementById("myChart"));
      const data = char.data;
      if(data.datasets.length > 0) {
        data.labels.push(timeNormalize(new Date()));

        for(let i = 0; i < data.datasets.length; i++) {
          let dataset = data.datasets[i];
          console.log(dataset)
          switch(dataset.label) {
            case "Temperatura": dataset.data.shift(), dataset.data.push(Math.floor(Math.random() * 99) + 1); break;
            case "Humedad relativa": dataset.data.shift(), dataset.data.push(Math.floor(Math.random() * 99) + 1); break;
            case "Humedad suelo": dataset.data.shift(), dataset.data.push(Math.floor(Math.random() * 1022) + 1); break;
            case "Voltaje": dataset.data.shift(), dataset.data.push(Math.floor(Math.random() * 17) + 1); break;
            case "Carga bateria": dataset.data.shift(), dataset.data.push(Math.floor(Math.random() * 6) + 1); break;
          }
        }
        data.labels.shift();
        return char.update();
      }
    },2000)
  },[])

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
