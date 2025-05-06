import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Création d'une instance Axios avec une configuration de base
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://api.boaz-study.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Récupération du token depuis le localStorage
    const token = localStorage.getItem('auth_token');
    
    // Si un token existe, on l'ajoute aux headers
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Gestion des erreurs globales
    if (error.response) {
      // Le serveur a répondu avec un code d'erreur
      console.error('API Error:', error.response.data);
      
      // Gestion des erreurs d'authentification (401)
      if (error.response.status === 401) {
        // Redirection vers la page de connexion ou déconnexion de l'utilisateur
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error('Network Error:', error.request);
    } else {
      // Une erreur s'est produite lors de la configuration de la requête
      console.error('Request Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Fonction pour vérifier si on doit utiliser les mocks
const shouldUseMocks = (): boolean => {
  return process.env.REACT_APP_USE_MOCKS === 'true' || !process.env.REACT_APP_API_URL;
};

// Exportation de l'instance API
export default api;
export { shouldUseMocks };
