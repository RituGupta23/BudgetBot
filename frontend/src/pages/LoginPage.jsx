import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  Mail,
  Lock,
  Loader2,
  BarChart3,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react"

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate("/dashboard")
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await login(formData.email, formData.password)
    if (!result.success) setError(result.error)

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] via-[#F7EFE5] to-[#C3ACD0] flex flex-col justify-center py-24 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C3ACD0] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7743DB] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#F7EFE5] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-3">
          Welcome back
        </h2>
        <p className="text-center text-lg text-gray-600 mb-8">
          Sign in to continue tracking your expenses
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#FFFBF5] rounded-2xl shadow-xl border border-[#F7EFE5] py-10 px-8 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#C3ACD0] group-focus-within:text-[#7743DB]" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 border border-[#F7EFE5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7743DB] bg-[#FFFBF5] placeholder-gray-400"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#C3ACD0]" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 pr-12 border border-[#F7EFE5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7743DB] bg-[#FFFBF5] placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#C3ACD0] hover:text-[#7743DB]"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center animate-shake">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                {error}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-md text-base font-semibold text-white bg-gradient-to-r from-[#7743DB] to-[#C3ACD0] hover:from-[#6B3BC7] hover:to-[#B89BC4] focus:outline-none disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#F7EFE5]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#FFFBF5] text-gray-500 font-medium">
                  New to our platform?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-[#C3ACD0] rounded-xl shadow-sm bg-[#FFFBF5] text-base font-semibold text-[#7743DB] hover:bg-[#F7EFE5]"
              >
                Create New Account
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-[#7743DB] hover:text-[#6B3BC7] font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Secure Login
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              256-bit Encryption
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              GDPR Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
