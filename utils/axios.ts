import axios from "axios";
import { setErrValues, openDialog } from "~/stores/err.store";

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
    console.log(error)
    setErrValues("An error occured during data retrieval", error.message);
    openDialog();
    return (error);
  }
);

export default apiClient;