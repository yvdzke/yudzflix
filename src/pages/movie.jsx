import { useEffect, useState } from "react";
import NavBar from "../components/Layout/NavBar";
import Header from "../components/Fragments/Header";
import Footer from "../components/Layout/Footer";
import CardMovies from "../components/Fragments/CardMovies";

// Slick
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Slider = Slick.default;

// Assets
import ArrowRight from "../assets/img/arrow-right.png";
import ArrowLeft from "../assets/img/arrow-left.png";

// Services
import { getMovieList } from "../services/movie.service";
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

// ================= ARROW =================
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-10
               bg-black/70 hover:bg-white/40 p-3 rounded-full cursor-pointer"
  >
    <img src={ArrowRight} alt="" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-10
               bg-black/70 hover:bg-white/40 p-3 rounded-full cursor-pointer"
  >
    <img src={ArrowLeft} alt="" />
  </div>
);

// ================= SLIDER SETTING =================
const sliderSetting = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

// ================= SECTION NORMAL =================
const Section = ({ title, movies }) => (
  <section className="flex flex-col gap-4">
    <h2 className="text-white text-xl font-semibold">{title}</h2>

    <Slider {...sliderSetting}>
      {movies.map((movie) => (
        <div key={movie.id} className="px-2">
          <CardMovies>
            <CardMovies.CardImage
              img={`${IMAGE_BASE_URL}${movie.poster_path}`}
              name={movie.title}
            />
            <CardMovies.Overlay />
          </CardMovies>
        </div>
      ))}
    </Slider>
  </section>
);

// ================= SECTION LANDSCAPE (KHUSUS) =================
const SectionLandscape = ({ title, movies }) => (
  <section className="flex flex-col gap-4">
    <h2 className="text-white text-xl font-semibold">{title}</h2>

    <Slider {...sliderSetting}>
      {movies.map((movie) => (
        <div key={movie.id} className="px-2">
          {/* WRAPPER LANDSCAPE */}
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />

            {/* overlay tetap */}
            <div className="absolute inset-0 hover:bg-black/50 transition" />
          </div>
        </div>
      ))}
    </Slider>
  </section>
);

// ================= PAGE =================
const MoviePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((data) => setMovies(data));
  }, []);

  console.log(movies);

  return (
    <div className="bg-[#181A1C] min-h-screen">
      <NavBar />
      <Header />

      <div className="max-w-[1300px] mx-auto px-6 flex flex-col gap-14 py-10">
        {/* 1 — LANDSCAPE */}
        <SectionLandscape title="Melanjutkan Tonton Film" movies={movies} />

        {/* 2 */}
        <Section title="Top Rating Film dan Series Hari Ini" movies={movies} />

        {/* 3 */}
        <Section title="Film Trending" movies={movies} />

        {/* 4 */}
        <Section title="Rilis Baru" movies={movies} />
      </div>

      <Footer />
    </div>
  );
};

export default MoviePage;
