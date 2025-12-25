import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardMovies from "../Fragments/CardMovies";

// Assets
import ArrowRight from "../../assets/img/arrow-right.png";
import ArrowLeft from "../../assets/img/arrow-left.png";

const Slider = Slick.default;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

//
// ================= ARROW =================
//
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-10 bg-black/70 p-3 rounded-full cursor-pointer"
  >
    <img src={ArrowRight} alt="next" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-10 bg-black/70 p-3 rounded-full cursor-pointer"
  >
    <img src={ArrowLeft} alt="prev" />
  </div>
);

//
// ================= SLIDER =================
//
const sliderSetting = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

//
// ================= SECTION =================
//
const MovieSection = ({ title, movies, variant = "portrait" }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-white text-xl font-semibold">{title}</h2>

      <Slider {...sliderSetting}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-2">
            <CardMovies variant={variant}>
              <CardMovies.CardImage
                variant={variant}
                img={`${IMAGE_BASE_URL}${
                  variant === "landscape"
                    ? movie.backdrop_path || movie.poster_path
                    : movie.poster_path
                }`}
                name={movie.title}
              />
              <CardMovies.Overlay
                movie={movie}
                original_title={movie.original_title}
              />
            </CardMovies>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default MovieSection;
