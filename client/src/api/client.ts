import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:4000/api/todos',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});