import axios from "axios";
import { store } from "./reduxToolkit/store";
import { logout, setLoading } from "./reduxToolkit/slices/userSlice";
const baseUrl = "http://localhost:3001";
const api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
})
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") || ""
    store.dispatch(setLoading(true))
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    config.headers["Content-Type"] = "application/json";
    
    return config;
  },
  (error) => {
    store.dispatch(setLoading(false))
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
    (response) => {
      store.dispatch(setLoading(false))
      return response;
    },
    (error) => {
      store.dispatch(setLoading(false))
      if (error.response) {
        if (error.response.status === 401) {
          store.dispatch(logout())
           window.location.href = "/"
        }
      }
      return Promise.reject(error);
    }
  );

export const getApi = async (endpoint) => {
    try {
        const res = await api.get(endpoint);
        return res;
    } catch(err) {
        throw new Error(err)
    }
}
export const postApi = async (endpoint, payload) => {
    try {
        const res = await api.post(endpoint, payload)
        return res;
    } catch(err) {
        throw err?.response
    }
}
export const patchApi = async (endpoint, payload) => {
  try {
    const res = await api.patch(endpoint, payload);
    return res;
  } catch(err) {
    throw new Error(err)
  }
}

export const putApi = async (endpoint, payload) => {
  try {
    const res = await api.put(endpoint, payload);
    return res;
  } catch(err) {
    throw err
  }
}

export const deleteApi = async (endpoint) => {
  try {
    const res = await api.delete(endpoint);
    return res;
  } catch(err) {
    throw err
  }
}