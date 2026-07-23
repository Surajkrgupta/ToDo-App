const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/todos';
const AUTH_URL=BASE_URL.replace('/api/todos','/api/auth');
import axios from "axios";


const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const register = async (email, password) => {
  const { data } = await api.post(`${AUTH_URL}/register`, {
    email,
    password,
  });

  return data;
};

export const login = async (email, password) => {
  const { data } = await api.post(`${AUTH_URL}/login`, {
    email,
    password,
  });

  return data;
};

export const getTodos = async () => {
  const { data } = await api.get(BASE_URL);
  return data;
};


export const addTodo = async (title) => {
  const { data } = await api.post(BASE_URL, { title });
  return data;
};

export const toggleTodo = async (id) => {
  const { data } = await api.patch(`${BASE_URL}/${id}`);
  return data;
};
export const updateTitle = async (id, title) => {
  const { data } = await api.patch(`${BASE_URL}/${id}`, { title });
  return data;
};

export const deleteTodo = async (id) => {
  const { data } = await api.delete(`${BASE_URL}/${id}`);
  return data;
};