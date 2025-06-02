"use client"

import { useState, useRef } from "react"
import { FaArrowUp } from "react-icons/fa"

export default function Nowy() {

  return (
    <div className="flex flex-col items-center w-full p-8 min-h-screen">
        <textarea
        className="resize-none rounded-xl p-3 w-[700px] bg-[#3b3b3b] outline-none caret-white text-white"
        rows={1}
        placeholder="Wpisz temat..."
        style={{ maxHeight: 200 }}
        />
    </div>
  )
}