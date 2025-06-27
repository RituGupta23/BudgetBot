import { useMemo } from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, PieChartIcon, IndianRupee, Calendar, Award } from "lucide-react"

const COLORS = ["#7743DB", "#C3ACD0", "#F7EFE5", "#FFFBF5", "#8b5cf6", "#06b6d4", "#84cc16", "#f97316"]

const ChartSection = ({ expenses }) => {
  const categoryData = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {})

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [expenses])

  const dailyData = useMemo(() => {
    const dailyTotals = expenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
      acc[date] = (acc[date] || 0) + expense.amount
      return acc
    }, {})

    return Object.entries(dailyTotals)
      .map(([date, amount]) => ({ date, amount }))
      .slice(-7) // Last 7 days
  }, [expenses])

  const totalSpent = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0)
  }, [expenses])

  const averageDaily = useMemo(() => {
    if (dailyData.length === 0) return 0
    return totalSpent / dailyData.length
  }, [totalSpent, dailyData])

  const topCategory = useMemo(() => {
    return categoryData.length > 0 ? categoryData[0] : null
  }, [categoryData])

  const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value)
}


  if (expenses.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#F7EFE5] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PieChartIcon className="h-8 w-8 text-[#C3ACD0]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No data to display</h3>
            <p className="text-gray-500">Add some expenses to see your spending breakdown.</p>
          </div>
        </div>
        <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#F7EFE5] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-[#C3ACD0]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No trends yet</h3>
            <p className="text-gray-500">Track expenses over time to see spending trends.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
              <p className="text-xs text-gray-500 mt-1">This period</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <IndianRupee className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-600 mb-1">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{categoryData.length}</p>
              <p className="text-xs text-gray-500 mt-1">Active categories</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-xl flex items-center justify-center shadow-md">
              <PieChartIcon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-600 mb-1">Daily Average</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageDaily)}</p>
              <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-600 mb-1">Top Category</p>
              <p className="text-lg font-bold text-gray-900">{topCategory?.category || "N/A"}</p>
              <p className="text-xs text-gray-500 mt-1">
                {topCategory ? formatCurrency(topCategory.amount) : "No data"}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Breakdown */}
        <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-xl flex items-center justify-center shadow-md">
              <PieChartIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Spending by Category</h3>
              <p className="text-sm text-gray-600">Breakdown of your expenses</p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Spending */}
        <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-xl flex items-center justify-center shadow-md">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Daily Spending Trend</h3>
              <p className="text-sm text-gray-600">Last 7 days activity</p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F7EFE5" />
                <XAxis dataKey="date" stroke="#C3ACD0" />
                <YAxis stroke="#C3ACD0" />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "#FFFBF5",
                    border: "1px solid #F7EFE5",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="amount" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7743DB" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#C3ACD0" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartSection
