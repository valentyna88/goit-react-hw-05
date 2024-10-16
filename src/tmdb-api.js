import axios from 'axios';

const API_READ_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTBlZjljZjM2YWQzZDJiYTdkN2YyMWMwNzVlM2YzMSIsIm5iZiI6MTcyOTA2MTkwNy42MDIzMjEsInN1YiI6IjY3MGRhMzdmZDVmOTNhM2RhMGJiZmIwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IINcn_N8_8mGfgti6HoUJrLh0ZGE4wpCvM2kH-pMs84';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
};

const fetchTrendingMovies = async () => {
  const response = await axios.get('/trending/movie/day', options);
  return response.data.results;
};
export default fetchTrendingMovies;
