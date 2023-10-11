'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineEye } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

function getStyle(variant, size = 20) {
  switch(variant) {
    case "edit": return {
      icon: <BiEdit size={size} />,
      color: "bg-amber-500 hover:bg-amber-600 active:bg-amber-700",
      title: "Actualizar"
    };
    case "add": return {
      icon: <IoIosAdd size={size} />,
      color: "bg-blue-400 hover:bg-blue-500 active:bg-blue-600",
      title: "Añadir"
    };
    case "delete": return {
      icon: <MdDeleteOutline size={size} />,
      color: "bg-red-500 hover:bg-red-600 active:bg-red-700",
      title: "Eliminar"
    };
    default: return {
      icon: <AiOutlineEye size={size} />,
      color: "bg-sena-100 hover:bg-sena-200 active:bg-sena-300",
      title: "Ver"
    };
  }
}

export function ActionLink({ url, card = false, variant = "" }) {

  const style = getStyle(variant);

  return (
    <Link
      title={style.title}
      href={url}
      className={`${card?"max-w-[65px] w-full p-2":"py-1 px-3"} flex justify-center rounded-sm text-white ${style.color}`}
    >
      {style.icon}
    </Link>
  )
}

export function ButtonIcon({ variant, action = () => {} }) {

  const style = getStyle(variant);

  return (
    <button
      title={style.title}
      onClick={action}
      className={`py-1 px-3 flex justify-center rounded-sm text-white ${style.color}`}
    >
      {style.icon}
    </button>
  )
}

export function DeleteButton({ url }) {

  const style = getStyle("delete");
  const router = useRouter();

  const HandleDelete = async () => {
    const res = await fetch(url, {method: "DELETE"})
    if(res.ok) {
      router.refresh();
      return;
    }
  }

  return (
    <button
      title={style.title}
      onClick={async () => await HandleDelete()}
      className={`py-1 px-3 flex justify-center rounded-sm text-white ${style.color}`}
    >
      {style.icon}
    </button>
  )
}
