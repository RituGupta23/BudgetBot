import { useState, useEffect, useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Menu, X, User, LogOut, Settings, BarChart3, ChevronDown, Bell} from "lucide-react"

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate("/login")
    setIsDropdownOpen(false)
  }

  const isActive = (path) => location.pathname === path

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // if (!isAuthenticated && location.pathname === "/") {
  //   return null // Don't show navbar on onboarding page when not authenticated
  // }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFFBF5]/95 backdrop-blur-md shadow-lg border-b border-[#F7EFE5]"
          : "bg-[#FFFBF5] shadow-sm border-b border-[#F7EFE5]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to={isAuthenticated ? "/dashboard" : "/"}
              className="flex items-center group transition-transform hover:scale-105"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7743DB] to-[#C3ACD0]">
                BudgetBot
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive("/dashboard")
                      ? "text-[#7743DB] bg-[#C3ACD0]/20 shadow-sm"
                      : "text-gray-700 hover:text-[#7743DB] hover:bg-[#F7EFE5]"
                  }`}
                >
                  Dashboard
                </Link>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-[#7743DB] transition-colors rounded-xl hover:bg-[#F7EFE5]">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 text-gray-700 hover:text-[#7743DB] focus:outline-none p-2 rounded-xl hover:bg-[#F7EFE5] transition-all duration-200"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-[#C3ACD0] to-[#F7EFE5] rounded-xl flex items-center justify-center shadow-sm">
                      <User className="w-4 h-4 text-[#7743DB]" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium">{user?.name}</div>
                      <div className="text-xs text-gray-500">Account</div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#FFFBF5] rounded-2xl shadow-xl py-2 z-50 border border-[#F7EFE5] animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-[#F7EFE5]">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#C3ACD0] to-[#F7EFE5] rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-[#7743DB]" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user?.name}</div>
                            <div className="text-sm text-gray-500">{user?.email}</div>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-[#F7EFE5] hover:text-[#7743DB] transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Account Settings
                        </Link>
                      </div>

                      <div className="border-t border-[#F7EFE5] pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-[#7743DB] px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-[#F7EFE5]"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-[#7743DB] to-[#C3ACD0] hover:from-[#6B3BC7] hover:to-[#B89BC4] text-white font-medium py-2 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#7743DB] focus:outline-none p-2 rounded-xl hover:bg-[#F7EFE5] transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-4 space-y-2 bg-[#FFFBF5] border-t border-[#F7EFE5] shadow-lg">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="flex items-center space-x-3 px-3 py-4 bg-[#F7EFE5] rounded-xl mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#C3ACD0] to-[#F7EFE5] rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-[#7743DB]" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user?.name}</div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive("/dashboard")
                      ? "text-[#7743DB] bg-[#C3ACD0]/20"
                      : "text-gray-700 hover:text-[#7743DB] hover:bg-[#F7EFE5]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  Dashboard
                </Link>

                <Link
                  to="/settings"
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive("/settings")
                      ? "text-[#7743DB] bg-[#C3ACD0]/20"
                      : "text-gray-700 hover:text-[#7743DB] hover:bg-[#F7EFE5]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </Link>

                <div className="border-t border-[#F7EFE5] pt-2 mt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-[#7743DB] hover:bg-[#F7EFE5] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-[#7743DB] to-[#C3ACD0] hover:from-[#6B3BC7] hover:to-[#B89BC4] transition-all shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
