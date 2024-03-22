import axios from 'axios'

const getBaseURL = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://your-production-url.com/api/'
  } else {
    return 'http://localhost:3000/api/'
  }
}

export const api = axios.create({
  baseURL: getBaseURL(),
})

export const fetcher = async (url: string, baseURL?: string) => {
  const axiosInstance = baseURL ? axios.create({ baseURL }) : api
  const res = await axiosInstance.get(url)
  return res.data
}
