export default function GraficaContainer({ fullHeight = false, children }) {
  return (
    <div className={`bg-gray-200 border border-zinc-300 ${fullHeight?"min-h-[85vh] h-full":"h-96"} w-full rounded-md p-3`}>
      {children}
    </div>
  )
}
