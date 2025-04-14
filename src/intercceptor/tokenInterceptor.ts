import axios from "axios";

const { VITE_HOST, VITE_PORT } = import.meta.env;
const apiClient = axios.create({
  baseURL: `${VITE_HOST}:${VITE_PORT}`
})
apiClient.interceptors.request.use(
  (config) => {
    const cookie = document.cookie.split("=");
    const token = cookie[1];
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error("Erreur d'authentification : redirection vers la connexion.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default apiClient;