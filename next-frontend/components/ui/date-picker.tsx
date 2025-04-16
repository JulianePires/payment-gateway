"use client"

import { Calendar } from "lucide-react"

interface DatePickerProps {
  placeholder: string
}

export function DatePicker({ placeholder }: DatePickerProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-slate-700 border border-slate-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
        <Calendar size={18} />
      </div>
    </div>
  )
}
