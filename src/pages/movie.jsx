import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Layout
import NavBar from "../components/Layout/NavBar";
import Header from "../components/Fragments/Header";
import Footer from "../components/Layout/Footer";

// Components
import TrailerModal from "../components/Layout/TrailerModal";
import MovieSection from "../components/Layout/MovieSection";
import Button from "../components/Elements/Button/Button";

// Redux
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
} from "../store/movieSlice";

import { showMovie } from "../store/uiSlice";

const MoviePage = () => {
  const dispatch = useDispatch();

  const { popular, topRated, upcoming, nowPlaying, loading } = useSelector(
    (state) => state.movie
  );

  const favorites = useSelector((state) => state.favorite.movies);
  const view = useSelector((state) => state.ui.view);

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
        {/* MOVIE VIEW */}
        {view === "movie" && (
          <>
            <MovieSection
              title="Now Playing"
              movies={nowPlaying}
              variant="landscape"
            />
            <MovieSection title="Movies" movies={popular} />
            <MovieSection title="Top Rated" movies={topRated} />
            <MovieSection title="Upcoming" movies={upcoming} />
          </>
        )}

        {/* FAVORITE VIEW */}
        {view === "favorite" && (
          <>
            {favorites.length > 0 ? (
              <MovieSection title="My Favorite" movies={favorites} />
            ) : (
              <div className="text-center text-white mt-20">
                <p className="text-xl mb-4">No favorite movie yet</p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
      <TrailerModal />
    </div>
  );
};

export default MoviePage;
