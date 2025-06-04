// src/lib/axios.ts
import axios from 'axios';
import { BASE_URL } from '../config/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default api;
