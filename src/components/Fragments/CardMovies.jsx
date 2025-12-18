import Button from "../Elements/Button/Button";

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
        <span className="">{original_title}</span>
        <Button varian="bg-white rounded-md p-2 font-bold hover:text-blue-700 text-black">
          Trailer
        </Button>
        <Button onClick={onClick} varian="bg-white rounded-md p-2 text-black">
          Add to Favorite
        </Button>
        <span>{quality}</span>
      </div>
    </div>
  );
};

CardMovies.CardImage = CardImage;
CardMovies.Overlay = Overlay;

export default CardMovies;
