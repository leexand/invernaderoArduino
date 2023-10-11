function getSize(size) {
  switch(size) {
    case "md": return "md:w-3/5 lg:w-2/5";
    case "lg": return "md:w-3/4 lg:w-3/5";
    case "xl": return "md:w-4/5 lg:w-3/4 xl:w-3/5";
    case "2xl": return "sm:h-4/5 md:w-3/4";
    case "full": return "";
    default: return "max-w-fit";
  }
}

export default function CardPages({ size, title, children }) {
  return (
    <main className="min-h-screen h-full flex items-center justify-center text-white">
      <div className={`flex flex-col items-center justify-between ${getSize(size)}`}>
        <div className="border rounded-md bg-zinc-700 border-black p-10 pb-5 w-full">
          <div className="w-full text-center pb-5 mb-5 border-b">
            <h2 className="text-4xl font-semibold">{ title }</h2>
          </div>
          { children }
        </div>
      </div>
    </main>
  )
}
