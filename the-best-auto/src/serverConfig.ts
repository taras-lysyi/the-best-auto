import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://the-best-auto.com:4206',
  headers: { 'Content-Type': 'application/json' },
})
