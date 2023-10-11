import { dataChart } from "@/backend/dataFetch"
import GraficaLine from "@/components/graficas/GraficaLine"

export const metadata = {
  title: 'Información General',
}

export default async function General() {
  const data = await dataChart();

  return (
    <div className="grid grid-cols-1 grid-rows-1 min-h-[95vh]">
      <div className="bg-gray-200 border h-full border-zinc-300 rounded-md p-3">
        <GraficaLine data={data} />
      </div>
    </div>
  )
}
