import Button from "../Elements/Button/Button";
import { IoAdd } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";

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

const Overlay = (props) => {
  const { original_title, quality, onClick } = props;
  return (
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
      <div className="flex flex-col gap-2 justify-between w-full text-white text-sm">
        <span className="font-bold">{original_title}</span>
        <div className="flex gap-2 flex-row">
          <Button
            onClick={onClick}
            varian="bg-white p-2 text-black font-bold rounded-md hover:text-blue-500  "
          >
            Trailer
          </Button>
          <Button varian="bg-[#181A1C] hover:bg-gray-700 rounded-full">
            <IoAdd color="white" size={40} />
          </Button>
        </div>
        <span>{quality}</span>
      </div>
    </div>
  );
};

CardMovies.CardImage = CardImage;
CardMovies.Overlay = Overlay;

export default CardMovies;
