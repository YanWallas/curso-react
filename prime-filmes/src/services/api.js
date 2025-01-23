import axios from "axios";

// Base da URL: https://api.themoviedb.org/3/
// URL da api: /movie/now_playing?api_key=10336075e69e824f4134ca90376b9ed8

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

export default api;