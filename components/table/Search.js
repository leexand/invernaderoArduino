'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react"
import { BiSearch } from "react-icons/bi"

export default function Search({ search = '' }) {

  const router = useRouter();
  const pathname = usePathname();
  const [text, setText] = useState(search);
  const [textDebounce, setTextDebounce] = useState(search);
  const [open, setOpen] = useState(false);

  const initialRender = useRef(true)

  useEffect(() => {

    if(initialRender.current) {
      initialRender.current = false;
      return;
    }

    let params = new URLSearchParams(window.location.search)

    if(!textDebounce || textDebounce.length < 3) {
      params.delete("search")
    }
    else {
      params.set("search", textDebounce)
    }

    params.set("page", 1)

    router.replace(`${pathname}?${params.toString()}`)

  },[textDebounce, router])

  useEffect(() => {
    const time = setTimeout(() => {
      setTextDebounce(text)
    }, 550)

    return () => {
      clearTimeout(time)
    }
  }, [text])

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <BiSearch size={20} fill="#9ca3af" />
      </span>
      <input
        type="text"
        value={text}
        onFocusCapture={() => setOpen(true)}
        onBlurCapture={() => setOpen(false)}
        placeholder="Buscar"
        onChange={e => setText(e.target.value)}
        className="block w-full p-2 pl-10 rounded-md border-[3px] focus:border-green-700 text-black outline-none"
      />
      <div className={`absolute border-2 z-[5] border-green-700 text-black rounded-sm bg-gray-50 w-full ${open&&text.length<3 ? "block" : "hidden"} py-2 px-4`}>
        Ingresa minimo 3 caracteres
      </div>
    </div>
  )
}
