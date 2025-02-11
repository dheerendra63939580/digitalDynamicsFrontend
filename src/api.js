import axios from "axios";
const baseUrl = "http://localhost:3001";
const token = localStorage.getItem("token") || ""
const api = axios.create({
    baseURL: baseUrl
})
api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : token;

api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
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
        throw new Error(err)
    }
}