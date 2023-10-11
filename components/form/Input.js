import { ERROR_SERVER_IGNORER } from "@/constants";

export default function Input({ label, placeholder, type, doubleCol = false, validated, errors }) {
  return (
    <div className={`flex flex-col gap-2 mb-4 ${doubleCol?"col-span-1 md:col-span-2":""}`}>
      <label>{ label }</label>
      <input
        type={type}
        {...validated}
        placeholder={placeholder}
        className={`w-full indent-1 block p-2 rounded-md border-[3px] ${errors?"border-red-500":""} text-black outline-none`}
      />
      {(errors!==ERROR_SERVER_IGNORER&&errors)&&(<span className="indent-2 text-red-500 text-base rounded-md">{errors}</span>)}
    </div>
  )
}
