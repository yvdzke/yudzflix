const CardMovies = ({ children }) => {
  return (
    <div className=" w-full overflow-hidden items-center justify-center min-w-sm max-w-sm  max-h-sm rounded-md ">
      {children}
    </div>
  );
};

const CardImage = (props) => {
  const { img, name } = props;
  return <img src={img} alt={name} className="px-3 rounded-xl object-cover" />;
};

CardMovies.CardImage = CardImage;

export default CardMovies;
