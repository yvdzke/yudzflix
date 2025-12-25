import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Slick
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Assets
import ArrowRight from "../../assets/img/arrow-right.png";
import ArrowLeft from "../../assets/img/arrow-left.png";

// Components
import CardMovies from "../Fragments/CardMovies";

// Services
import { getMovieTrailer, getMovieSimilar } from "../../services/movie.service";

// Redux
import { setTrailerKey, closePlayer } from "../../store/playerSlice";

const Slider = Slick.default;

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
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

//
// ================= MODAL =================
//
const TrailerModal = () => {
  const dispatch = useDispatch();
  const { activeMovie, trailerKey, isOpen } = useSelector(
    (state) => state.player
  );

  // Substring
  const [showFull, setShowFull] = useState(false);
  const truncateText = (text, max = 100) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max) + "..." : text;
  };

  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    if (!activeMovie?.id) return;

    getMovieTrailer(activeMovie.id).then((key) => dispatch(setTrailerKey(key)));
    getMovieSimilar(activeMovie.id).then(setSimilarMovies);
  }, [activeMovie, dispatch]);

  if (!isOpen || !activeMovie) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={() => dispatch(closePlayer())}
    >
      <div
        className="w-[700px] bg-[#181A1C] rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== TRAILER ===== */}
        <div className="aspect-video bg-black">
          {trailerKey ? (
            <iframe
              key={trailerKey}
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="autoplay"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Loading trailer...
            </div>
          )}
        </div>

        {/* ===== CONTENT ===== */}
        <div className="p-5 text-white flex flex-col gap-6">
          {/* ===== TITLE & OVERVIEW ===== */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{activeMovie.title}</h2>

            <div className="flex gap-3 text-sm text-gray-400">
              <span>{activeMovie.release_date?.slice(0, 4)}</span>
              <span>⭐ {activeMovie.vote_average?.toFixed(1)}</span>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {showFull
                ? activeMovie.overview
                : truncateText(activeMovie.overview, 100)}
            </p>

            {activeMovie.overview?.length > 100 && (
              <button
                onClick={() => setShowFull(!showFull)}
                className="text-sm text-white hover:underline mt-[-13px] self-start"
              >
                {showFull ? "Read less" : "Read more"}
              </button>
            )}
          </div>

          {/* ===== SIMILAR MOVIES ===== */}
          {similarMovies.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Similar Movies</h3>

              <Slider {...sliderSetting}>
                {similarMovies.map((movie) => (
                  <div key={movie.id} className="px-2">
                    <CardMovies>
                      <CardMovies.CardImage
                        img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
