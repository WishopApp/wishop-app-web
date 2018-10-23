import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get(process.env.AUTH_TOKEN_NAME)

const axiosInstance = axios.create({
  baseURL: process.env.API_ROOT_URL,
  headers: { Authorization: `Bearer ${token}` },
})

export default axiosInstance
