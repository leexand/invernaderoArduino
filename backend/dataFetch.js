import { query } from "@/utils/db";
import { timeNormalize } from "@/utils/normalizeData";

export const revalidate = 2

export async function dataChart() {
  const data = await query({
    query: `
      SELECT *
      FROM (
        SELECT *
        FROM mediciones
        ORDER BY fecha DESC
        LIMIT 10
      )Var1
      ORDER BY fecha ASC
    `
  });

  let rawData = {};

  for(let values of data) {
    for(let index in values) {
      let f = typeof values[index] === "object" ? timeNormalize(values[index]) : undefined
      index in rawData ? rawData[index].push(f??values[index]) : rawData[index] = [f??values[index]]
    }
  }

  const chartData = {
    labels: rawData.fecha,
    datasets: [
      {
        label: 'Temperatura',
        data: rawData.temperatura,
        tension: 0.2,
        borderColor: "#dc2626"
      },
      {
        label: 'Humedad relativa',
        data: rawData.humedad_rel,
        tension: 0.2,
        borderColor: "#0891b2"
      },
      {
        label: 'Humedad suelo',
        data: rawData.humedad_sue,
        tension: 0.2,
        borderColor: "#0284c7"
      },
      {
        label: 'Voltaje',
        data: rawData.voltaje,
        tension: 0.2,
        borderColor: "#facc15"
      },
      {
        label: 'Carga bateria',
        data: rawData.carga_bat,
        tension: 0.2,
        borderColor: "#059669"
      }
    ]
  }

  return chartData;
}
