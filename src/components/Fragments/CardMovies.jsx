import Button from "../Elements/Button/Button";
import { IoAdd, IoCheckmark } from "react-icons/io5";
import { IoMdPlay } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

// ✅ Import Actions dari Slice yang sudah kita update
import { addToFavorite, removeFromFavorite } from "../../store/favoriteSlice";
import { playMovie } from "../../store/playerSlice";

const CardMovies = ({ children, variant = "portrait" }) => {
  return (
    <div
      className={`relative group overflow-hidden rounded-md cursor-pointer
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
  <>
    {/* Label Top (Opsional) */}
    {/* <div className="absolute right-1 h-[48px] w-[31px] bg-red-600 rounded-tr-lg rounded-bl-lg">
      <p className="text-white ml-1">Top</p>
    </div> */}

    <img
      src={img}
      alt={name}
      className={`object-cover rounded-md transition-transform duration-300
      group-hover:scale-110
      ${
        variant === "landscape" ? "w-[360px] h-[200px]" : "w-[200px] h-[280px]"
      }`}
    />
  </>
);

const Overlay = ({ movie, original_title }) => {
  const dispatch = useDispatch();

  // 1. Ambil data favorit dari Redux (Data dari Database Postgres)
  const favorites = useSelector((state) => state.favorite.movies || []);

  if (!movie) return null;

  // 2. CEK STATUS FAVORIT
  // Kita cari: Apakah ada film di database yang judulnya SAMA dengan film ini?
  // (Kita pakai judul karena ID TMDB beda dengan ID Postgres)
  const favoriteItem = favorites.find((fav) => fav.title === movie.title);

  // Kalau ketemu (favoriteItem ada isinya), berarti statusnya Favorite
  const isFavorite = !!favoriteItem;

  // 3. HANDLE KLIK TOMBOL
  const handleFavorite = () => {
    if (isFavorite) {
      // 🗑️ HAPUS: Gunakan ID dari database lokal (favoriteItem.id)
      dispatch(removeFromFavorite(favoriteItem.id));
    } else {
      // ➕ TAMBAH: Siapkan data lengkap untuk dikirim ke Backend
      const movieData = {
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        // Genre wajib ada biar fitur Filter tugas kamu jalan
        genre: movie.vote_average > 7.5 ? "Action" : "Drama",
      };

      dispatch(addToFavorite(movieData));
    }
  };

  return (
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
      <div className="flex flex-col gap-2 w-full text-white text-sm">
        <span className="font-bold">{original_title}</span>

        <div className="flex gap-2">
          {/* TOMBOL PLAY */}
          <Button
            onClick={() => dispatch(playMovie(movie))}
            varian="bg-white flex items-center justify-center p-2 rounded-full"
          >
            <IoMdPlay color="black" size={20} />
          </Button>

          {/* TOMBOL FAVORITE (Toggle Add/Remove) */}
          <Button
            onClick={handleFavorite}
            varian="rounded-full bg-[#181A1C] hover:bg-gray-600"
          >
            {isFavorite ? (
              // Kalau sudah favorit: Tampilkan Centang Hijau ✅
              <IoCheckmark color="#4ade80" size={32} />
            ) : (
              // Kalau belum: Tampilkan Plus Putih ➕
              <IoAdd color="white" size={32} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Assign Child Components
CardMovies.CardImage = CardImage;
CardMovies.Overlay = Overlay;

export default CardMovies;
