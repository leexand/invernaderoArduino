'use client'

import { IoMdClose } from "react-icons/io"

function getSize(size) {
  switch(size) {
    case "md": return "md:w-4/6 lg:w-3/6 xl:w-2/5";
    case "lg": return "md:w-3/4 lg:w-4/6 xl:w-3/6";
    case "xl": return "md:w-4/5 lg:w-3/4 xl:w-3/5";
    default: return "max-w-fit";
  }
}

export default function Modal({ onClose = () => {}, title, size = "", children }) {
  return (
    <div id="modal" onMouseDown={(e) => e.target.id==="modal"&&onClose()} className="flex justify-center items-center overflow-hidden overscroll-none bg-fixed fixed inset-0 z-50 bg-neutral-800/70 ">
      <div className={`relative w-full ${getSize(size)} my-6 mx-auto h-full lg:h-auto md:h-auto`}>
        <div className="translate h-full translate-y-0 opacity-100">
          <div className="h-full lg:h-auto md:h-auto border-0 rounded-md shadow-md relative flex flex-col w-full bg-zinc-700 dark:text-white">
            <div className="flex items-center justify-center p-6 rounded-t relative border-b-[1px]">
              <div className="text-2xl font-semibold">
                { title }
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:opacity-70 transition absolute right-9">
                  <IoMdClose size={24} />
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
