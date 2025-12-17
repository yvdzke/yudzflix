import { useState, useEffect } from "react";

// Components
import Header from "../components/Fragments/Header";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import Button from "../components/Elements/Button/Button";
import CardMovies from "../components/Fragments/CardMovies";

// Assets
import ArrowRight from "../assets/img/arrow-right.png";
import ArrowLeft from "../assets/img/arrow-left.png";

// Services
import { getMovies } from "../services/movie.service";

// Slick
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Slider = Slick.default;

// Custom Arrow
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-[-5px] top-1/2 -translate-y-1/2 z-10
               cursor-pointer bg-[#0c0c0c] hover:bg-white/40
               p-3 rounded-full"
    onClick={onClick}
  >
    <img src={ArrowRight} alt="" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-[-5px] top-1/2 -translate-y-1/2 z-10
               cursor-pointer bg-[#0c0c0c] hover:bg-white/40
               p-3 rounded-full"
    onClick={onClick}
  >
    <img src={ArrowLeft} alt="" />
  </div>
);

const MoviePage = () => {
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies((data) => {
      setMovies(data);
    });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="bg-[#181A1C]">
      <NavBar />
      <Header />

      <div className="flex flex-col gap-10 justify-center items-center">
        {/* Content 1 */}
        <h1 className="text-3xl text-white font-bold mb-3 ml-2">
          Recomend Watch
        </h1>
        <div className="w-[1200px]">
          <Slider {...settings}>
            {movies.map((movie) => (
              <div className="">
                <CardMovies>
                  <CardMovies.CardImage
                    key={movie.id}
                    img={movie.image}
                    name={movie.title}
                  />
                </CardMovies>
              </div>
            ))}
          </Slider>
        </div>
        {/* Content 2 */}
        <h1 className="text-3xl text-white font-bold mb-3 ml-2">
          Recent Watch
        </h1>
        <div className="w-[1200px]">
          <Slider {...settings}>
            {movies.map((movie) => (
              <div className="">
                <CardMovies>
                  <CardMovies.CardImage
                    key={movie.id}
                    img={movie.image}
                    name={movie.title}
                  />
                </CardMovies>
              </div>
            ))}
          </Slider>
        </div>

        {/* COUNTER */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-white text-3xl">
            Simple useState Mission Harisenin
          </h1>

          <Button
            onClick={() => setCount(0)}
            varian="bg-white py-2 px-4 rounded-md"
          >
            Reset
          </Button>

          <div className="flex gap-4 items-center">
            <Button
              onClick={() => setCount((c) => Math.max(0, c - 1))}
              varian="bg-white py-2 px-4 rounded-md"
            >
              -
            </Button>

            <span className="text-white px-4 py-2 border rounded-md">
              {count}
            </span>

            <Button
              onClick={() => setCount((c) => c + 1)}
              varian="bg-white py-2 px-4 rounded-md"
            >
              +
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MoviePage;
