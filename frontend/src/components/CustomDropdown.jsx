import React, { useState, useRef, useEffect } from "react"
import { ChevronDown, Check } from "lucide-react"

const CustomDropdown = ({ value, onChange, options, placeholder, icon }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full min-w-[180px] px-4 py-3 border border-[#F7EFE5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7743DB] focus:border-transparent text-sm bg-[#FFFBF5] hover:border-[#C3ACD0] transition-all shadow-sm hover:shadow-md"
      >
        <div className="flex items-center space-x-2">
          {icon && <span className="text-[#C3ACD0]">{icon}</span>}
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-[#C3ACD0] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#FFFBF5] border border-[#F7EFE5] rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm hover:bg-[#F7EFE5] transition-colors first:rounded-t-xl last:rounded-b-xl ${
                value === option.value ? "bg-[#C3ACD0]/20 text-[#7743DB]" : "text-gray-700"
              }`}
            >
              <span className="capitalize">{option.label}</span>
              {value === option.value && <Check className="w-4 h-4 text-[#7743DB]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomDropdown
