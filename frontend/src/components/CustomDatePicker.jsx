import { useState, useRef, useEffect } from "react"
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react"

const CustomDatePicker = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const datePickerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const formatDisplayDate = (dateString) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const handleDateSelect = (date) => {
  const dateString = date.getFullYear() + "-" +
    String(date.getMonth() + 1).padStart(2, "0") + "-" +
    String(date.getDate()).padStart(2, "0")

  onChange(dateString)
  setIsOpen(false)
}


  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + (direction === "prev" ? -1 : 1))
      return newDate
    })
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date) => {
    if (!value) return false
    const selectedDate = new Date(value)
    return date.toDateString() === selectedDate.toDateString()
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="relative" ref={datePickerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full min-w-[180px] px-4 py-3 border border-[#F7EFE5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7743DB] focus:border-transparent text-sm bg-[#FFFBF5] hover:border-[#C3ACD0] transition-all shadow-sm hover:shadow-md"
      >
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-[#C3ACD0]" />
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {value ? formatDisplayDate(value) : placeholder}
          </span>
        </div>
        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onChange("")
            }}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-[#FFFBF5] border border-[#F7EFE5] rounded-xl shadow-xl z-50 p-4 min-w-[300px]">
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth("prev")}
              className="p-2 hover:bg-[#F7EFE5] rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-[#7743DB]" />
            </button>
            <h3 className="text-base font-semibold text-gray-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={() => navigateMonth("next")}
              className="p-2 hover:bg-[#F7EFE5] rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-[#7743DB]" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((date, index) => (
              <div key={index} className="aspect-square">
                {date ? (
                  <button
                    type="button"
                    onClick={() => handleDateSelect(date)}
                    className={`w-full h-full flex items-center justify-center text-sm rounded-lg transition-all hover:bg-[#F7EFE5] ${
                      isSelected(date)
                        ? "bg-[#7743DB] text-white hover:bg-[#6B3BC7]"
                        : isToday(date)
                          ? "bg-[#C3ACD0]/30 text-[#7743DB] font-semibold"
                          : "text-gray-700"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#F7EFE5]">
            <button
              type="button"
              onClick={() => {
                onChange(new Date().toISOString().split("T")[0])
                setIsOpen(false)
              }}
              className="text-sm text-[#7743DB] hover:text-[#6B3BC7] font-medium"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => {
                onChange("")
                setIsOpen(false)
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomDatePicker
