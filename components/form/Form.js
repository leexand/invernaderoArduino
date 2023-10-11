'use client'

export default function Form({ btnLabel, onSubmit = () => {}, children, doubleCol = false, errs }) {
  return (
    <form onSubmit={onSubmit} autoComplete="off" >
      <div className={`grid gap-4 ${doubleCol?"grid-cols-1 md:grid-cols-2":""}`}>
        {errs&&(<span className={`bg-red-600 text-white text-center whitespace-nowrap text-sm p-3 w-full h-fit rounded-md ${doubleCol?"col-span-1 md:col-span-2":""}`}>{errs}</span>)}
        { children }
      </div>
      <button type="submit" className="w-full block py-2 text-white bg-green-600 hover:bg-green-700 focus:bg-green-800 rounded-md" >{btnLabel}</button>
    </form>
  )
}
