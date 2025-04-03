import axios from "axios";
import { errStore } from "~/stores/err.store";

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 5000,
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    errStore.setValues('Error', error.message)
    return Promise.reject(error);
  }
);

export default apiClient;