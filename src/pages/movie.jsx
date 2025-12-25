import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Layout
import NavBar from "../components/Layout/NavBar";
import Header from "../components/Fragments/Header";
import Footer from "../components/Layout/Footer";

// Components
import CardMovies from "../components/Fragments/CardMovies";

// Slick
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Assets
import ArrowRight from "../assets/img/arrow-right.png";
import ArrowLeft from "../assets/img/arrow-left.png";

// Services
import {
  getMovieList,
  getMovieListTopRate,
  getMovieListUpcoming,
  getMovieTrailer,
  getMovieSimilar,
  getMovieNowPlaying,
} from "../services/movie.service";

const Slider = Slick.default;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

//
// ================= ARROW =================
//
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-10
               bg-black/70 hover:bg-white/40 p-3 rounded-full cursor-pointer"
  >
    <img src={ArrowRight} alt="next" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-10
               bg-black/70 hover:bg-white/40 p-3 rounded-full cursor-pointer"
  >
    <img src={ArrowLeft} alt="prev" />
  </div>
);

//
// ================= SLIDER SETTINGS =================
//
const sliderSetting = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 5 } },
    { breakpoint: 1024, settings: { slidesToShow: 4 } },
    { breakpoint: 768, settings: { slidesToShow: 3 } },
    { breakpoint: 480, settings: { slidesToShow: 2 } },
  ],
};

const modalSliderSetting = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
};

//
// ================= SECTIONS =================
//
const Section = ({ title, movies = [], id, onClick }) => (
  <section id={id} className="flex flex-col gap-4">
    <h2 className="text-white text-xl font-semibold">{title}</h2>

    <Slider {...sliderSetting}>
      {movies.map((movie) => (
        <div key={movie.id} className="px-2">
          <CardMovies>
            <CardMovies.CardImage
              img={`${IMAGE_BASE_URL}${movie.poster_path}`}
              name={movie.title}
            />
            <CardMovies.Overlay
              movie={movie}
              original_title={movie.original_title}
              onClick={() => onClick(movie)}
            />
          </CardMovies>
        </div>
      ))}
    </Slider>
  </section>
);

const SectionLandscape = ({ title, movies, onClick }) => (
  <section className="flex flex-col gap-4">
    <h2 className="text-white text-xl font-semibold">{title}</h2>

    <Slider {...sliderSetting}>
      {movies.map((movie) => (
        <div key={movie.id} className="px-2">
          <LandscapeCard movie={movie} onClick={onClick} />
        </div>
      ))}
    </Slider>
  </section>
);

const ModalSection = ({ title, movies, onClick }) => (
  <section className="flex flex-col gap-4 mt-6">
    <h2 className="text-white text-lg font-semibold">{title}</h2>

    <Slider {...modalSliderSetting}>
      {movies.map((movie) => (
        <div key={movie.id} className="px-2">
          <CardMovies>
            <CardMovies.CardImage
              img={`${IMAGE_BASE_URL}${movie.poster_path}`}
              name={movie.title}
            />
            <CardMovies.Overlay
              original_title={movie.original_title}
              onClick={() => onClick(movie)}
            />
          </CardMovies>
        </div>
      ))}
    </Slider>
  </section>
);

//
// ================= MODAL =================
//
const TrailerModal = ({ movie, trailerKey, onMovieClick, onClose }) => {
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (!movie?.id) return;
    getMovieSimilar(movie.id).then(setSimilarMovies);
  }, [movie]);

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-[700px] max-w-[90%] bg-[#181A1C] rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* VIDEO */}
        <div className="w-full aspect-video bg-black">
          {trailerKey ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="autoplay"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Trailer tidak tersedia
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="p-4 text-white flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold">{movie.original_title}</h3>

            <p className="text-sm line-clamp-3">
              {movie.overview || "Overview tidak tersedia."}
            </p>

            <div className="flex gap-2 mt-2 text-xs">
              <span className="border p-1 rounded-md">
                ⭐ {movie.vote_average}
              </span>
              <span className="border p-1 rounded-md">
                {movie.release_date}
              </span>
            </div>
          </div>

          {similarMovies.length > 0 && (
            <ModalSection
              title="Similar Movies"
              movies={similarMovies}
              onClick={onMovieClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

//
// ================= CARD =================
//
const LandscapeCard = ({ movie, onClick }) => (
  <div
    className="relative aspect-video rounded-md overflow-hidden cursor-pointer"
    onClick={() => onClick(movie)}
  >
    <img
      src={`${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`}
      alt={movie.title}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition" />
    <div className="absolute bottom-0 w-full p-3 bg-black/60 text-white text-sm">
      {movie.title}
    </div>
  </div>
);

//
// ================= PAGE =================
//
const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [activeMovie, setActiveMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const favoriteMovies = useSelector((state) => state.favorite.movies);

  useEffect(() => {
    getMovieList().then(setMovies);
    getMovieListTopRate().then(setTopRatedMovies);
    getMovieListUpcoming().then(setUpcomingMovies);
    getMovieNowPlaying().then(setNowPlayingMovies);
  }, []);

  const handleClickMovie = async (movie) => {
    setActiveMovie(movie);
    setTrailerKey(await getMovieTrailer(movie.id));
  };

  return (
    <div className="bg-[#181A1C] min-h-screen">
      <NavBar />
      <Header />

      <div className="max-w-[1300px] mx-auto px-6 py-10 flex flex-col gap-14">
        <SectionLandscape
          title="Recent Movies"
          movies={nowPlayingMovies}
          onClick={handleClickMovie}
        />

        <Section title="Movies" movies={movies} onClick={handleClickMovie} />
        <Section
          id="toprated"
          title="Top Rated"
          movies={topRatedMovies}
          onClick={handleClickMovie}
        />
        <Section
          title="Upcoming"
          movies={upcomingMovies}
          onClick={handleClickMovie}
        />

        {favoriteMovies.length > 0 && (
          <Section
            title="My Favorite"
            movies={favoriteMovies}
            onClick={handleClickMovie}
          />
        )}
      </div>

      <Footer />

      <TrailerModal
        movie={activeMovie}
        trailerKey={trailerKey}
        onClose={() => setActiveMovie(null)}
        onMovieClick={handleClickMovie}
      />
    </div>
  );
};
//yvdzke
export default MoviePage;
