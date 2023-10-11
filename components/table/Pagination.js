'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Pagination({ total, perPage }) {

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const per_page = perPage;
  const totalPage = Math.ceil(Number(total) / per_page);

  const urlNormalize = (data) => {
    let params = new URLSearchParams(window.location.search)
    params.set("page", data)
    return `${pathname}?${params.toString()}`
  }

  let pageNumbers = [];

  for(let i = page - 3; i <= page + 3; i++) {
    if(i < 1) continue;
    if(i > totalPage) break;
    pageNumbers.push(i);
  }

  return (
    <nav className='py-4 text-center'>
      <ul className='inline-flex -space-x-px text-md text-white bg-emerald-600 rounded-md overflow-hidden border border-gray-300 divide-x divide-gray-300'>
        <li>
          <button
            disabled={page <= 2}
            onClick={() => router.replace(urlNormalize(1))}
            className="flex items-center justify-center px-4 py-2 h-full hover:bg-emerald-600 disabled:bg-emerald-800" >
            <MdKeyboardDoubleArrowLeft size={20} />
          </button>
        </li>
        {pageNumbers.map((pageN, index) => (
          <li key={index}>
            <button
              onClick={() => router.replace(urlNormalize(pageN))}
              className={`flex items-center justify-center px-4 py-2 h-full ${pageN===page?"bg-emerald-700":"hover:bg-emerald-700"}`}
            >
              {pageN}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={page >= (totalPage-1)}
            onClick={() => router.replace(urlNormalize(totalPage))}
            className="flex items-center justify-center px-4 py-2 h-full hover:bg-emerald-600 disabled:bg-emerald-800" >
            <MdKeyboardDoubleArrowRight size={20} />
          </button>
        </li>
      </ul>
    </nav>
  )
}
