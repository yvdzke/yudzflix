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

        <div className="p-4 text-white">
          <h3 className="text-lg font-semibold mb-3">Similar Movies</h3>

          <Slider {...sliderSetting}>
            {similarMovies.map((movie) => (
              <div key={movie.id} className="px-2">
                <CardMovies>
                  <CardMovies.CardImage
                    img={`${IMAGE_BASE_URL}${movie.poster_path}`}
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
      </div>
    </div>
  );
};

export default TrailerModal;
