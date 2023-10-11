'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CiHome, CiLight, CiPower, CiTempHigh } from "react-icons/ci"
import { AiOutlineMenu } from "react-icons/ai"
import { RxCross2 } from "react-icons/rx"
import { BiExit } from "react-icons/bi"

export default function Sidebar({ NavItems }) {

  const router = useRouter();

  const SignOut = async () => {
    const res = await fetch("/api/auth/logout")
    if(res.ok) {
      router.refresh()
      return router.push("/")
    }
  }

  const pathname = usePathname();
  const [open,setOpen] = useState(true);

  return (
    <nav className={`w-full ${open?"absolute md:relative z-10 w-screen md:max-w-xs translate-x-0":"max-w-[90px] -translate-x-0 items-end"} ease-in-out duration-300 min-h-screen bg-green-600 text-white p-5 flex flex-col justify-between`}>
      <div className="relative">
        <button className="absolute top-0 right-0 hover:bg-green-500 py-2 px-4 rounded-sm text-lg" onClick={() => setOpen((prev) => !prev)}>{open?<RxCross2 size={20} />:<AiOutlineMenu size={20} />}</button>
        <h1 className={`w-full text-center text-4xl font-semibold ${open?"block":"hidden"}`} >Invernadero</h1>
        <ul className={`${!open?"mt-10":""} py-5 text-lg`}>
          {NavItems.map((item, index) => (
            <li key={index} className="w-full" >
              <Link
                href={item.url}
                title={item.label}
                className={`${item.url === pathname?"bg-green-500":"hover:bg-green-500"} flex items-center gap-5 ${open?"p-2 w-full":"py-2 px-4 w-fit"} rounded-sm`}
              >
                { item.icon } { open&&item.label }
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={SignOut}
        title="Cerrar sesión"
        className={`hover:bg-green-500 text-left flex items-center gap-5 ${open?"p-2":"py-2 px-4 w-fit"} rounded-sm`}
      >
        { open&&"Cerrar Sesión" } <BiExit size={20} />
      </button>
    </nav>
  )
}
