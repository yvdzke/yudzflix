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

const Overlay = () => {
  return (
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
      <div className="flex justify-between w-full text-white text-sm">
        <span>★ 4.5 / 5</span>
        <span>HD</span>
      </div>
    </div>
  );
};

CardMovies.CardImage = CardImage;
CardMovies.Overlay = Overlay;

export default CardMovies;
