import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  User,
  Mail,
  Lock,
  Phone,
  Loader2,
  BarChart3,
  Eye,
  EyeOff,
  Check,
  X,
  ArrowRight,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Calculate password strength
    if (name === "password") {
      calculatePasswordStrength(value)
    }
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    setPasswordStrength(strength)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500"
    if (passwordStrength <= 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Weak"
    if (passwordStrength <= 3) return "Medium"
    return "Strong"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await register(formData)

    if (result.success) {
      navigate("/dashboard")
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const isFormValid = () => {
    return formData.name && formData.email && formData.phone && formData.password && passwordStrength >= 3
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBF5] via-[#F7EFE5] to-[#C3ACD0] flex flex-col justify-center py-24 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C3ACD0] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7743DB] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-[#F7EFE5] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-3">Join our platform</h2>
        <p className="text-center text-lg text-gray-600 mb-8">Start tracking your expenses with AI-powered insights</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg relative z-10">
        <div className="bg-[#FFFBF5] rounded-2xl shadow-xl border border-[#F7EFE5] py-10 px-8 backdrop-blur-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-[#C3ACD0] group-focus-within:text-[#7743DB] transition-colors" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 border border-[#F7EFE5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7743DB] focus:border-transparent bg-[#FFFBF5] hover:border-[#C3ACD0] transition-all placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                  {formData.name && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#C3ACD0] group-focus-within:text-[#7743DB] transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 border border-[#F7EFE5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7743DB] focus:border-transparent bg-[#FFFBF5] hover:border-[#C3ACD0] transition-all placeholder-gray-400"
                    placeholder="Enter your email address"
                  />
                  {formData.email && formData.email.includes("@") && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  WhatsApp Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-[#C3ACD0] group-focus-within:text-[#7743DB] transition-colors" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 border border-[#F7EFE5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7743DB] focus:border-transparent bg-[#FFFBF5] hover:border-[#C3ACD0] transition-all placeholder-gray-400"
                    placeholder="+1 (555) 123-4567"
                  />
                  {formData.phone && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500 flex items-center">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  This number will be used for WhatsApp expense tracking
                </p>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#C3ACD0] group-focus-within:text-[#7743DB] transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-12 pr-12 border border-[#F7EFE5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7743DB] focus:border-transparent bg-[#FFFBF5] hover:border-[#C3ACD0] transition-all placeholder-gray-400"
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#C3ACD0] hover:text-[#7743DB] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Password strength</span>
                      <span
                        className={`text-xs font-medium ${passwordStrength <= 2 ? "text-red-600" : passwordStrength <= 3 ? "text-yellow-600" : "text-green-600"}`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center animate-shake">
                <X className="w-4 h-4 mr-2 text-red-500" />
                {error}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !isFormValid()}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-semibold text-white bg-gradient-to-r from-[#7743DB] to-[#C3ACD0] hover:from-[#6B3BC7] hover:to-[#B89BC4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7743DB] disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
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
                <span className="px-4 bg-[#FFFBF5] text-gray-500 font-medium">Next steps after registration</span>
              </div>
            </div>

            {/* Enhanced WhatsApp Setup Section */}
            <div className="mt-6 bg-gradient-to-r from-[#F7EFE5] to-[#FFFBF5] p-6 rounded-xl border border-[#C3ACD0]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#C3ACD0] rounded-lg flex items-center justify-center mr-3">
                  <MessageSquare className="w-5 h-5 text-[#7743DB]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#7743DB]">WhatsApp Setup</h4>
                  <p className="text-xs text-gray-600">Connect your WhatsApp for expense tracking</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    step: 1,
                    text: 'Send "join local-carry" to +1 415 523 8886',
                    icon: <MessageSquare className="w-4 h-4" />,
                  },
                  { step: 2, text: "Wait for confirmation message", icon: <Shield className="w-4 h-4" /> },
                  {
                    step: 3,
                    text: 'Start sending expenses like "Spent ₹25 on lunch"',
                    icon: <Zap className="w-4 h-4" />,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center bg-[#FFFBF5] p-3 rounded-lg border border-[#F7EFE5]">
                    <div className="w-6 h-6 bg-[#7743DB] rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                      {item.step}
                    </div>
                    <div className="text-[#7743DB] mr-3">{item.icon}</div>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-[#7743DB] hover:text-[#6B3BC7] font-medium transition-colors">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Secure Registration
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Data Protected
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

export default RegisterPage
