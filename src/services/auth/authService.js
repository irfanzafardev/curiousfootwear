import axios from "axios"

const API_URL = "https://thecuriousfootwear-server.vercel.app/api/auth/"

// Register new user
const register = async (userData) => {
  const res = await axios.post(API_URL + 'signup', userData)

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }

  return res.data
}

// login user
const login = async (userData) => {
  const res = await axios.post(API_URL + 'login', userData)

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }
  return res.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout
}

export default authService
