import { timeNormalize } from "@/utils/normalizeData";

export const revalidate = 2

export async function dataChart() {

  const d = new Date();
  let rawData = {
    fechas: [],
    temperatura: [],
    humedad_rel: [],
    humedad_sue: [],
    voltaje: [],
    carga_bat: []
  }

  for(let i = 1; i < 10; i++) {
    rawData.fechas.unshift(timeNormalize((d.getTime() - (1000 * (i * 2)))));
    rawData.temperatura.unshift(Math.floor(Math.random() * 99) + 1);
    rawData.humedad_rel.unshift(Math.floor(Math.random() * 99) + 1);
    rawData.humedad_sue.unshift(Math.floor(Math.random() * 1022) + 1);
    rawData.voltaje.unshift(Math.floor(Math.random() * 17) + 1);
    rawData.carga_bat.unshift(Math.floor(Math.random() * 6) + 1);
  }

  const chartData = {
    labels: rawData.fechas,
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

  return chartData;
}
