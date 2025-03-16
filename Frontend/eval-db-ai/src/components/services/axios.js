import axios from 'axios';

// Créer une instance Axios avec la configuration de base
const instance = axios.create({
  baseURL: 'url', // Remplacez ceci par l'URL de votre API
  timeout: 10000, // Durée maximale d'attente des requêtes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Vous pouvez ajouter des interceptors si vous le souhaitez (par exemple, pour ajouter un token d'authentification)
instance.interceptors.request.use(
  (config) => {
    // Par exemple, ajouter un token d'authentification dans les en-têtes
    const token = localStorage.getItem('authToken'); // Récupérez le token depuis le stockage local ou un autre moyen
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gérer les erreurs globalement (par exemple, afficher des alertes ou des notifications)
    console.error('Erreur de la requête:', error);
    return Promise.reject(error);
  }
);

export default instance;
