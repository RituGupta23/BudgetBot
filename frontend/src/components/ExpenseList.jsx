import { useState, useMemo } from "react"
import { Calendar, IndianRupee, Tag, Filter, Search, SortAsc, SortDesc, X } from "lucide-react"
import CustomDropdown from "./CustomDropdown"
import CustomDatePicker from "./CustomDatePicker"

const ExpenseList = ({ expenses, loading }) => {
  const [filterCategory, setFilterCategory] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState("desc")

  const categories = useMemo(() => {
    const cats = [...new Set(expenses.map((expense) => expense.category))]
    return cats.sort()
  }, [expenses])

  const filteredExpenses = useMemo(() => {
    const filtered = expenses.filter((expense) => {
      const categoryMatch = !filterCategory || expense.category === filterCategory
      const dateMatch = !filterDate || expense.date.startsWith(filterDate)
      const searchMatch =
        !searchTerm ||
        expense.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchTerm.toLowerCase())
      return categoryMatch && dateMatch && searchMatch
    })

    // Sort by amount
    filtered.sort((a, b) => {
      return sortOrder === "desc" ? b.amount - a.amount : a.amount - b.amount
    })

    return filtered
  }, [expenses, filterCategory, filterDate, searchTerm, sortOrder])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-in", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  const getCategoryColor = (category) => {
    const colors = {
      Food: "bg-orange-100 text-orange-800",
      Transportation: "bg-blue-100 text-blue-800",
      Shopping: "bg-purple-100 text-purple-800",
      Entertainment: "bg-pink-100 text-pink-800",
      Healthcare: "bg-red-100 text-red-800",
      Utilities: "bg-green-100 text-green-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-[#F7EFE5] rounded w-1/4"></div>
            <div className="flex space-x-3">
              <div className="h-10 bg-[#F7EFE5] rounded w-32"></div>
              <div className="h-10 bg-[#F7EFE5] rounded w-32"></div>
            </div>
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-[#F7EFE5] rounded-xl">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-[#C3ACD0] rounded w-48"></div>
                <div className="h-3 bg-[#C3ACD0] rounded w-32"></div>
              </div>
              <div className="h-6 bg-[#C3ACD0] rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 lg:mb-0">
          <div className="w-10 h-10 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-xl flex items-center justify-center shadow-md">
            <IndianRupee className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recent Expenses</h3>
            <p className="text-sm text-gray-600">{filteredExpenses.length} transactions found</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Enhanced Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C3ACD0] w-4 h-4" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-[#F7EFE5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7743DB] focus:border-transparent text-sm bg-[#FFFBF5] hover:border-[#C3ACD0] transition-all placeholder-gray-400 min-w-[200px]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Enhanced Category Dropdown */}
          <CustomDropdown
            value={filterCategory}
            onChange={setFilterCategory}
            options={[{ value: "", label: "All Categories" }, ...categories.map((cat) => ({ value: cat, label: cat }))]}
            placeholder="Filter by category"
            icon={<Filter className="w-4 h-4" />}
          />

          {/* Enhanced Date Picker */}
          <CustomDatePicker value={filterDate} onChange={setFilterDate} placeholder="Filter by date" />

          {/* Enhanced Sort Button */}
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="flex items-center px-4 py-3 border border-[#C3ACD0] rounded-xl text-sm font-medium text-[#7743DB] bg-[#FFFBF5] hover:bg-[#F7EFE5] hover:border-[#7743DB] transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            {sortOrder === "desc" ? <SortDesc className="w-4 h-4 mr-2" /> : <SortAsc className="w-4 h-4 mr-2" />}
            Amount
          </button>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-[#F7EFE5] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <IndianRupee className="h-8 w-8 text-[#C3ACD0]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No expenses found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {expenses.length === 0
              ? "Start by adding your first expense using the form above."
              : "Try adjusting your search filters to find what you're looking for."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredExpenses.map((expense, index) => (
            <div
              key={expense._id}
              className="group flex items-center justify-between p-5 border border-[#F7EFE5] rounded-xl hover:bg-[#F7EFE5] hover:border-[#C3ACD0] transition-all duration-200 hover:shadow-md"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-base font-semibold text-gray-900 mb-2 capitalize">{expense.note || "Expense"}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getCategoryColor(expense.category)}`}
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {expense.category}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(expense.date)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xl font-bold text-gray-900">{formatAmount(expense.amount)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExpenseList
