import axios from 'axios';

const moviesInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTBlZjljZjM2YWQzZDJiYTdkN2YyMWMwNzVlM2YzMSIsIm5iZiI6MTcyOTA2MTkwNy42MDIzMjEsInN1YiI6IjY3MGRhMzdmZDVmOTNhM2RhMGJiZmIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IINcn_N8_8mGfgti6HoUJrLh0ZGE4wpCvM2kH-pMs84`,
  },
  params: {
    language: 'en-US',
    include_adult: false,
  },
});

export const fetchTrendingMovies = async () => {
  const {
    data: { results },
  } = await moviesInstance.get('/trending/movie/day');
  return results;
};

export const fetchMovieDetails = async movieId => {
  const { data } = await moviesInstance.get(`/movie/${movieId}`);
  return data;
};

export const fetchMovieCast = async movieId => {
  const {
    data: { cast },
  } = await moviesInstance.get(`/movie/${movieId}/credits`);
  return cast;
};

export const fetchMovieReviews = async movieId => {
  const {
    data: { results },
  } = await moviesInstance.get(`/movie/${movieId}/reviews`);
  return results;
};

export const fetchMovies = async query => {
  const {
    data: { results },
  } = await moviesInstance.get('/search/movie', {
    params: { query },
  });
  return results;
};
