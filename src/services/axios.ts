import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FAKE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiRoute = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${process.env.NEXT_PUBLIC_API_ROUTE_SECRET}`,
  },
})
