import { BASE_URL } from '@/config';
import axios from 'axios';

const baseURL: string = `${BASE_URL}`;

const token = localStorage.getItem('accessToken');

const api = axios.create({
  baseURL,
  headers: {
    'content-type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response || {};
    if (status === 401 || status === 403) {
      //logout();
      console.log('Error 404/401');
    }
    return Promise.reject(error);
  },
);

api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
