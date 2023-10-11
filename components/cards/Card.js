export default function Card({ children }) {
  return (
    <div className="bg-gray-200 border h-fit border-zinc-300 rounded-md p-3">
      { children }
    </div>
  )
}
