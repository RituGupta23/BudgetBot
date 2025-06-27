import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import api from "../services/api"
import ExpenseForm from "../components/ExpenseForm"
import ExpenseList from "../components/ExpenseList"
import ChartSection from "../components/ChartSection"
import { RefreshCw, Sparkles, Calendar } from "lucide-react"

const DashboardPage = () => {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses/my")
      setExpenses(response.data)
    } catch (error) {
      console.error("Failed to fetch expenses:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const handleExpenseAdded = () => {
    fetchExpenses()
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchExpenses()
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] via-[#F7EFE5] to-[#C3ACD0]/20 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="mb-10">
          <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-xl flex items-center justify-center shadow-md">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7743DB] to-[#C3ACD0]">
                      Welcome back, {user?.name}!
                    </h1>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      {getCurrentDate()}
                    </div>
                  </div>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Track and manage your daily expenses with AI-powered insights. Your financial journey starts here.
                </p>
              </div>
              <div className="mt-6 lg:mt-0 flex items-center space-x-4">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="inline-flex items-center px-6 py-3 border border-[#C3ACD0] rounded-xl shadow-sm text-sm font-medium text-[#7743DB] bg-[#FFFBF5] hover:bg-[#F7EFE5] hover:border-[#7743DB] disabled:opacity-50 transition-all transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                  Refresh Data
                </button>
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live sync enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Expense Form */}
          <ExpenseForm onExpenseAdded={handleExpenseAdded} />

          {/* Charts Section */}
          <ChartSection expenses={expenses} />

          {/* Expense List */}
          <ExpenseList expenses={expenses} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
