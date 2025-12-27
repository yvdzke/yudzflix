import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Layout
import NavBar from "../components/Layout/NavBar";
import Header from "../components/Fragments/Header";
import Footer from "../components/Layout/Footer";

// Components
import TrailerModal from "../components/Layout/TrailerModal";
import MovieSection from "../components/Layout/MovieSection";

// Redux
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
} from "../store/movieSlice";

const MoviePage = () => {
  const dispatch = useDispatch();

  const { popular, topRated, upcoming, nowPlaying, loading } = useSelector(
    (state) => state.movie
  );

  const favorites = useSelector((state) => state.favorite.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchNowPlayingMovies());
  }, [dispatch]);

  if (loading) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

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

        <MovieSection title="Movies" movies={popular} />
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
