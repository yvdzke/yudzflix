import Button from "../Elements/Button/Button";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/favoriteSlice.js";

const CardMovies = ({ children, variant = "portrait" }) => {
  return (
    <div
      className={`
        relative group overflow-hidden rounded-xl
        ${
          variant === "landscape"
            ? "w-[360px] h-[200px]"
            : "w-[200px] h-[280px]"
        }
      `}
    >
      {children}
    </div>
  );
};

const CardImage = ({ img, name, variant = "portrait" }) => {
  return (
    <img
      src={img}
      alt={name}
      className={`
        object-cover rounded-xl transition-transform duration-300
        group-hover:scale-110
        ${
          variant === "landscape"
            ? "w-[360px] h-[200px]"
            : "w-[200px] h-[280px]"
        }
      `}
    />
  );
};

const Overlay = ({ movie, original_title, onClick }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.movies);

  const isFavorite = favorites.some((fav) => fav.id === movie.id);

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
          <Button
            onClick={onClick}
            varian="bg-white p-2 text-black font-bold rounded-md hover:text-blue-500"
          >
            Trailer
          </Button>

          <Button
            onClick={handleFavorite}
            varian={`rounded-full ${
              isFavorite ? "bg-red-500" : "bg-[#181A1C]"
            }`}
          >
            <IoAdd color="white" size={40} />
          </Button>
        </div>
      </div>
    </div>
  );
};

CardMovies.CardImage = CardImage;
CardMovies.Overlay = Overlay;

export default CardMovies;
