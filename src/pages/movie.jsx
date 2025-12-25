import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Layout
import NavBar from "../components/Layout/NavBar";
import Header from "../components/Fragments/Header";
import Footer from "../components/Layout/Footer";

// Components
import TrailerModal from "../components/Layout/TrailerModal";
import MovieSection from "../components/Layout/MovieSection";

// Services
import {
  getMovieList,
  getMovieListTopRate,
  getMovieListUpcoming,
  getMovieNowPlaying,
} from "../services/movie.service";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  const favorites = useSelector((state) => state.favorite.movies);

  useEffect(() => {
    getMovieList().then(setMovies);
    getMovieListTopRate().then(setTopRated);
    getMovieListUpcoming().then(setUpcoming);
    getMovieNowPlaying().then(setNowPlaying);
  }, []);

  return (
    <div className="bg-[#181A1C] min-h-screen">
      <NavBar />
      <Header />

      <div className="max-w-[1300px] mx-auto px-6 py-10 flex flex-col gap-14">
        <MovieSection
          title="Now Playing"
          movies={nowPlaying}
          variant="landscape"
        />

        <MovieSection title="Movies" movies={movies} />
        <MovieSection title="Top Rated" movies={topRated} />
        <MovieSection title="Upcoming" movies={upcoming} />

        {favorites.length > 0 && (
          <MovieSection title="My Favorite" movies={favorites} />
        )}
      </div>

      <Footer />
      <TrailerModal />
    </div>
  );
};

export default MoviePage;
