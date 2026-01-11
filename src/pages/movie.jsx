import { useEffect, useState } from "react"; // ✅ Tambah useState
import { useDispatch, useSelector } from "react-redux";

// Layout
import NavBar from "../components/Layout/NavBar";
import Header from "../components/Fragments/Header";
import Footer from "../components/Layout/Footer";

// Components
import TrailerModal from "../components/Layout/TrailerModal";
import MovieSection from "../components/Layout/MovieSection";
import Button from "../components/Elements/Button/Button"; // Import Button

// Redux Actions
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchNowPlayingMovies,
} from "../store/movieSlice";

import { showMovie } from "../store/uiSlice";
import { fetchFavorites } from "../store/favoriteSlice";

const MoviePage = () => {
  const dispatch = useDispatch();

  // Data TMDB
  const { popular, topRated, upcoming, nowPlaying, loading } = useSelector(
    (state) => state.movie
  );

  // Data Backend
  const favorites = useSelector((state) => state.favorite.movies || []);
  const view = useSelector((state) => state.ui.view);

  // ✅ STATE UNTUK FILTER, SORT, SEARCH
  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("desc");

  // 1. Fetch Data Awal
  useEffect(() => {
    dispatch(showMovie()); // Reset ke tampilan awal
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchFavorites()); // Ambil data favorit polos (tanpa filter)
  }, [dispatch]);

  // ✅ FUNGSI HANDLE FILTER
  const handleApplyFilter = () => {
    // Dispatch ke Backend dengan membawa parameter
    dispatch(
      fetchFavorites({
        search: keyword,
        genre: genre,
        sort: sort,
      })
    );
  };

  // ✅ FUNGSI RESET
  const handleReset = () => {
    setKeyword("");
    setGenre("");
    setSort("desc");
    dispatch(fetchFavorites()); // Ambil ulang semua data
  };

  if (loading) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  return (
    <div className="bg-[#181A1C] min-h-screen">
      <NavBar />
      <Header />

      <div className="max-w-[1300px] mx-auto px-6 py-10 flex flex-col gap-14">
        {/* VIEW: MOVIE (TMDB) */}
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

        {/* VIEW: FAVORITE (DATABASE LOKAL) */}
        {view === "favorite" && (
          <>
            {/* 🔥 UI FILTER, SORT, SEARCH (Hanya muncul di menu favorite) */}
            <div className="bg-[#1f2123] p-6 rounded-lg mb-4 border border-gray-700">
              <h3 className="text-white font-bold mb-4 text-lg">
                My Favorites
              </h3>

              <div className="flex flex-wrap gap-4 items-end">
                {/* 1. SEARCH INPUT */}
                <div className="flex flex-col gap-2">
                  <label className="text-white text-sm">
                    Search Your Favorite Movies
                  </label>
                  <input
                    type="text"
                    placeholder="Search by title..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="bg-black text-white border border-gray-600 rounded px-3 py-2 w-48 focus:outline-none focus:border-white"
                  />
                </div>

                {/* 2. GENRE DROPDOWN */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-sm">Genre</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="bg-black text-white border border-gray-600 rounded px-3 py-2 w-32 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">All</option>
                    <option value="Action">Action</option>
                    <option value="Drama">Drama</option>
                    {/* Tambah genre lain jika backend support */}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-sm">
                    Urutkan Rating
                  </label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-black text-white border border-gray-600 rounded px-3 py-2 w-40 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="desc">Top Rate</option>
                    <option value="asc">Low Rate</option>
                  </select>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-2">
                  <Button
                    varian="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700 transition font-medium"
                    onClick={handleApplyFilter}
                  >
                    Apply
                  </Button>
                  <Button
                    varian="bg-gray-600 text-white px-5 py-2 rounded hover:bg-gray-700 transition font-medium"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* LIST MOVIE */}
            {favorites.length > 0 ? (
              <MovieSection title="My Favorite Movies" movies={favorites} />
            ) : (
              <div className="text-center text-white mt-10">
                <p className="text-xl font-bold">Tidak ada film ditemukan.</p>
                <p className="text-gray-400 text-sm">
                  Coba ubah filter atau tambahkan film baru.
                </p>
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
