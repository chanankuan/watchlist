import axios from 'axios';
import { API_KEY, BASE_URL } from './refs';

// BASE_URL = 'https://www.omdbapi.com';
// API_KEY = '31330ed';

axios.defaults.baseURL = BASE_URL;

export async function getMovieList(searchQuery) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: searchQuery,
  });

  const response = await axios.get('/', { params });
  return response.data;
}

export async function getMovieDetails(movieIds) {
  const arrayOfPromises = movieIds.map(async movieId => {
    const params = new URLSearchParams({
      apikey: API_KEY,
      i: movieId,
    });

    const response = await axios('/', { params });
    return response.data;
  });

  const movies = await Promise.all(arrayOfPromises);
  return movies;
}
