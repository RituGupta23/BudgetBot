import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api" 

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      fetchUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await api.get("/auth/getUser")
      setUser(response.data)
      setIsAuthenticated(true)
    } catch (error) {
      localStorage.removeItem("token")
      delete api.defaults.headers.common["Authorization"]
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setIsLoading(true)
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setUser(user)
      setIsAuthenticated(true)

      // toast({
      //   title: "Login successful",
      //   description: `Welcome back, ${user.name}!`,
      // })

      navigate("/dashboard")
      return true
    } catch (error) {
      // toast({
      //   variant: "destructive",
      //   title: "Login failed",
      //   description: error.response?.data?.message || "Invalid credentials",
      // })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setIsLoading(true)
      const response = await api.post("/auth/register", userData)
      const { token, user } = response.data

      localStorage.setItem("token", token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setUser(user)
      setIsAuthenticated(true)

      // toast({
      //   title: "Registration successful",
      //   description: `Welcome to XportConnect, ${user.name}!`,
      // })

      navigate("/dashboard")
      return true
    } catch (error) {
      // toast({
      //   variant: "destructive",
      //   title: "Registration failed",
      //   description: error.response?.data?.message || "Could not create account",
      // })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    delete api.defaults.headers.common["Authorization"]
    setUser(null)
    setIsAuthenticated(false)
    navigate("/login")

    // toast({
    //   title: "Logged out",
    //   description: "You have been successfully logged out.",
    // })
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
