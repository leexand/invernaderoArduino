'use client'

export default function FormInfo({ onSubmit = () => {}, children }) {
  return (
    <form onSubmit={onSubmit} autoComplete="off" className="flex justify-center items-start gap-4">
      {children}
      <button type="submit" className="p-2 block text-white bg-green-600 rounded-md" >Buscar</button>
    </form>
  )
}
