import { ERROR_SERVER_IGNORER } from "@/constants"

export default function Select({ label, doubleCol = false, inicial = "", validated, errors, children, ...props }) {
  return (
    <div className={`flex flex-col gap-2 mb-4 ${doubleCol?"col-span-1 md:col-span-2":""}`}>
      <label>{ label }</label>
        <select
          {...props}
          {...validated}
          defaultValue={inicial}
          onChangeCapture={(e) => e.target.title = e.target.selectedOptions[0].text}
          className="block w-full p-2 disabled:bg-zinc-400 border-3 rounded-md hover:border-sena-100 focus:border-sena-100 text-black truncate outline-none"
        >
          <option className="p-3" disabled value="" >Selecciona</option>
          {children}
        </select>
      {(errors!==ERROR_SERVER_IGNORER&&errors)&&(<span className="indent-2 text-red-500 text-base rounded-md">{errors}</span>)}
    </div>
  )
}

export function Option({ value, text }) {
  return <option className="p-3" value={value} >{text}</option>
}

