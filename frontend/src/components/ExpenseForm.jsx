import { useState } from "react"
import api from "../services/api"
import { Send, Loader2, MessageSquare, Sparkles, Lightbulb } from "lucide-react"

const ExpenseForm = ({ onExpenseAdded }) => {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showExamples, setShowExamples] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    setLoading(true)
    setError("")

    try {
      // Parse natural language message into structured data
      const parseResponse = await api.post("/expenses/parse", { message: text })
      const parsedData = parseResponse.data
      console.log("Parsed Data:", parsedData)

      // Create the actual expense using parsed data
      await api.post("/expenses/create", parsedData)

      setText("")
      onExpenseAdded() // Refresh expense list in parent
    } catch (error) {
      console.error("Error:", error)
      setError(error.response?.data?.error || "Failed to add expense")
    } finally {
      setLoading(false)
    }
  }

  const exampleMessages = [
    "Paid ₹120 for groceries at Walmart",
    "Coffee ₹4.50 at Starbucks",
    "Gas station ₹45",
    "Dinner with friends ₹85",
    "Uber ride ₹15 to downtown",
    "Movie tickets ₹24 for two",
  ]

  const handleExampleClick = (example) => {
    setText(example)
    setShowExamples(false)
  }

  return (
    <div className="bg-[#FFFBF5] rounded-2xl shadow-lg border border-[#F7EFE5] p-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-xl flex items-center justify-center shadow-md">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Add New Expense</h3>
          <p className="text-sm text-gray-600">Describe your expense in natural language</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="expense-text" className="block text-sm font-semibold text-gray-700 mb-3">
            What did you spend money on?
          </label>
          <div className="relative group">
            <input
              id="expense-text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g., 'Spent ₹25 on lunch at McDonald's' or 'Uber ride ₹15'"
              className="w-full px-4 py-4 pl-12 pr-16 border border-[#F7EFE5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7743DB] focus:border-transparent bg-[#FFFBF5] hover:border-[#C3ACD0] transition-all placeholder-gray-400 text-lg"
              disabled={loading}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Sparkles className="h-5 w-5 text-[#C3ACD0] group-focus-within:text-[#7743DB] transition-colors" />
            </div>
            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-[#7743DB] hover:text-[#6B3BC7] disabled:text-gray-400 bg-[#C3ACD0]/20 hover:bg-[#C3ACD0]/30 rounded-lg transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center animate-shake">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
            {error}
          </div>
        )}

        {/* AI Tips Section */}
        <div className="bg-gradient-to-r from-[#F7EFE5] to-[#FFFBF5] p-4 rounded-xl border border-[#C3ACD0]/30">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-[#C3ACD0] rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-[#7743DB]" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-[#7743DB] mb-2">AI-Powered Expense Tracking</h4>
              <p className="text-xs text-gray-600 mb-3">
                Our AI understands natural language and automatically categorizes your expenses. Just describe what you
                spent!
              </p>

              <button
                type="button"
                onClick={() => setShowExamples(!showExamples)}
                className="text-xs font-medium text-[#7743DB] hover:text-[#6B3BC7] transition-colors"
              >
                {showExamples ? "Hide examples" : "Show examples"}
              </button>

              {showExamples && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {exampleMessages.map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleExampleClick(example)}
                      className="text-left p-2 bg-[#FFFBF5] rounded-lg border border-[#F7EFE5] hover:border-[#C3ACD0] hover:bg-white transition-all text-xs text-gray-600 hover:text-[#7743DB]"
                    >
                      "{example}"
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ExpenseForm
