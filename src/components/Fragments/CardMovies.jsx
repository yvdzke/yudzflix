import Button from "../Elements/Button/Button";
import { IoAdd, IoCheckmark } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favoriteSlice";
import { playMovie } from "../../store/playerSlice";

const CardMovies = ({ children, variant = "portrait" }) => {
  return (
    <div
      className={`relative group overflow-hidden rounded-md
        ${
          variant === "landscape"
            ? "w-[300px] h-[150px]"
            : "w-[200px] h-[280px]"
        }`}
    >
      {children}
    </div>
  );
};

const CardImage = ({ img, name, variant = "portrait" }) => (
  <img
    src={img}
    alt={name}
    className={`object-cover rounded-md transition-transform duration-300
      group-hover:scale-110
      ${
        variant === "landscape" ? "w-[360px] h-[200px]" : "w-[200px] h-[280px]"
      }`}
  />
);

const Overlay = ({ movie, original_title }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.movies || []);

  if (!movie) return null;

  const isFavorite = favorites.some((fav) => fav?.id === movie.id);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
      <div className="flex flex-col gap-2 w-full text-white text-sm">
        <span className="font-bold">{original_title}</span>

        <div className="flex gap-2">
          {/* PLAY */}
          <Button
            onClick={() => dispatch(playMovie(movie))}
            varian="bg-white flex items-center justify-center p-2 rounded-full"
          >
            <IoMdPlay color="black" size={20} />
          </Button>

          {/* FAVORITE */}
          <Button
            onClick={handleFavorite}
            varian="rounded-full bg-[#181A1C] hover:bg-gray-600"
          >
            {isFavorite ? (
              <IoCheckmark color="white" size={32} />
            ) : (
              <IoAdd color="white" size={32} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

CardMovies.CardImage = CardImage;
CardMovies.Overlay = Overlay;

export default CardMovies;
