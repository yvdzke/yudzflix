import { useState, useEffect } from "react";
import { MdMovie } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Hapus useSelector kalau belum dipake

// IMPORT YANG BENAR (Sesuai authSlice baru)
import { logoutUser } from "../../store/authSlice";

import { showMovie, showFavorite } from "../../store/uiSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // State lokal untuk UI
  const [openProfile, setOpenProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ambil user dari LocalStorage (Karena authSlice kita simpan di sana)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const profileUser = storedUser ? storedUser.username : "User"; // Pakai username dari DB

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === FITUR LOGOUT (Update) ===
  const handleLogout = () => {
    // Panggil action logout dari Redux (ini otomatis hapus localStorage juga)
    dispatch(logoutUser());

    // Redirect ke halaman login
    navigate("/login");
  };

  // === FITUR DELETE (Hapus Dulu) ===
  // Kita hapus dulu karena Backend belum ada endpoint DELETE user.
  // Nanti kalau mau fitur ini, kita harus update Backend dulu.

  // Logic Sembunyikan Navbar
  const hideAuthLinks =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/movie";

  const hideBeranda =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  // Render Area
  return (
    <nav
      className={`fixed z-50 flex items-center justify-between top-0 left-0 right-0 px-4 py-4 transition-all duration-300
      ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      {/* LOGO */}
      <Link
        to="/movie"
        onClick={() => dispatch(showMovie())}
        className="flex items-center gap-2 font-bold text-white text-xl"
      >
        <MdMovie className="text-3xl" />
        YudzFlix
      </Link>

      {/* MENU TENGAH */}
      {!hideBeranda && (
        <div className="mr-auto ml-10 hidden md:block">
          <ul className="flex gap-6 text-white font-medium">
            <li className="cursor-pointer hover:text-gray-400">Series</li>
            <li className="cursor-pointer hover:text-gray-400">Film</li>

            <li
              onClick={() => dispatch(showFavorite())}
              className="cursor-pointer hover:text-gray-400"
            >
              My Favorite
            </li>
          </ul>
        </div>
      )}

      {/* TOMBOL LOGIN / REGISTER (Kalau belum login) */}
      {!hideAuthLinks && !storedUser && (
        <div className="flex items-center gap-4 mr-4">
          <Link
            to="/login"
            className="text-white w-20 h-7 flex items-center justify-center rounded-md border bg-transparent hover:border-indigo-500"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white w-20 h-7 flex items-center justify-center rounded-md border bg-transparent hover:border-indigo-500"
          >
            Register
          </Link>
        </div>
      )}

      {/* PROFILE DROPDOWN (Kalau sudah login) */}
      {!hideBeranda && storedUser && (
        <div className="relative mr-4">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <p className="text-white font-bold hidden sm:block">
              {profileUser}
            </p>
            <img
              src="https://res.cloudinary.com/dvym5vxsw/image/upload/v1766191504/mypp_h0ujrc.jpg"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-white transition-all"
            />
          </div>

          {/* Dropdown Menu */}
          {openProfile && (
            <div className="absolute right-0 mt-3 w-48 bg-black/90 border border-gray-700 rounded-md shadow-lg overflow-hidden z-50">
              <p className="block w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors">
                {profileUser}
              </p>
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpenProfile(false);
                }}
                className="block w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors"
              >
                Go to Profile
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-red-500 hover:bg-gray-800 transition-colors border-t border-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
