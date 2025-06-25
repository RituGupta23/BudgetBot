import axios from 'axios';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers:{
        "Content-Type": "application/json",
    }
})

//Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
}); 

// handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
);

//Auth API
export const authAPI = {
  login: (email, password) => api.post("/api/auth/login", { email, password }),
  register: (userData) => api.post("/api/auth/register", userData),
}

// Expenses API
export const expensesAPI = {
  getMyExpenses: () => api.get("/api/expenses/my"),
  parseExpense: (text) => api.post("/api/expenses/parse", { text }),
  createExpense: (expenseData) => api.post("/api/expenses/create", expenseData),
}

export default api;