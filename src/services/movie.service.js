import axios from "axios";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const getMovieList = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const getMovieTrailer = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );

    const trailer = response.data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return trailer ? trailer.key : null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};

export const getMovieListTopRate = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};
export const getMovieListUpcoming = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};

export const getMovieSimilar = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return [];
  }
};
