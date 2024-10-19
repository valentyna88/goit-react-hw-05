import axios from 'axios';

const API_READ_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTBlZjljZjM2YWQzZDJiYTdkN2YyMWMwNzVlM2YzMSIsIm5iZiI6MTcyOTA2MTkwNy42MDIzMjEsInN1YiI6IjY3MGRhMzdmZDVmOTNhM2RhMGJiZmIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IINcn_N8_8mGfgti6HoUJrLh0ZGE4wpCvM2kH-pMs84';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    '/trending/movie/day?include_adult=false&language=en-US',
    options
  );
  return response.data.results;
};

export const fetchMovieDetails = async movieId => {
  const response = await axios.get(`/movie/${movieId}?language=en-US`, options);
  return response.data;
};

export const fetchMovieCast = async movieId => {
  const response = await axios.get(
    `/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response.data.cast;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?language=en-US`,
    options
  );
  return response.data.results;
};

export const fetchMovies = async query => {
  const response = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US`,
    options
  );
  return response.data.results;
};
