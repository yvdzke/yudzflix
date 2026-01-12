import { useState, useEffect } from "react";
import { MdMovie } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoCaretDown } from "react-icons/io5";

// Actions
import { logoutUser } from "../../store/authSlice";
import { showMovie, showFavorite } from "../../store/uiSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // State lokal
  const [openProfile, setOpenProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ AMBIL DATA USER (JANGAN DIHAPUS)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser ? storedUser.username : "User";
  const fullname = storedUser ? storedUser.fullname : "";

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Logic Sembunyikan Navbar
  const hideAuthLinks =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/movie";

  const hideMiddleMenu =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/" ||
    location.pathname === "/profile";

  return (
    <nav
      className={`fixed z-50 flex items-center justify-between top-0 left-0 right-0 px-4 py-3 transition-all duration-300
      ${
        scrolled
          ? "bg-[#0d1117]/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* === KIRI: LOGO + MENU === */}
      <div className="flex items-center gap-10">
        <Link
          to="/movie"
          onClick={() => dispatch(showMovie())}
          className="flex items-center gap-2 font-bold text-white text-xl hover:text-gray-300 transition-colors"
        >
          <MdMovie className="text-3xl" />
          YudzFlix
        </Link>

        {!hideMiddleMenu && (
          <div className="hidden md:block">
            <ul className="flex gap-6 text-sm font-semibold text-gray-300">
              <li className="cursor-pointer hover:text-white transition-colors">
                Series
              </li>
              <li className="cursor-pointer hover:text-white transition-colors">
                Film
              </li>
              <li
                onClick={() => dispatch(showFavorite())}
                className="cursor-pointer hover:text-white transition-colors"
              >
                My Favorite
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* === KANAN: AUTH / PROFILE === */}
      <div>
        {!hideAuthLinks && !storedUser && (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-white px-4 py-1.5 rounded-md border border-white hover:border-gray-400 text-sm font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white px-4 py-1.5 rounded-md border border-white hover:border-gray-400 text-sm font-medium transition-colors"
            >
              Register
            </Link>
          </div>
        )}

        {storedUser && (
          <div className="relative">
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center gap-1 cursor-pointer focus:outline-none"
            >
              <img
                src="https://res.cloudinary.com/dvym5vxsw/image/upload/v1766191504/mypp_h0ujrc.jpg"
                alt="profile"
                className="w-8 h-8 rounded-full border border-gray-600"
              />
              <IoCaretDown className="text-gray-400 text-xs mt-1" />
            </button>

            {openProfile && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpenProfile(false)}
                ></div>

                <div className="absolute right-0 mt-2 w-64 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl py-2 z-50 text-sm animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-[#30363d]">
                    <p className="text-gray-400 text-xs">Signed in as</p>
                    <p className="font-bold text-white truncate">{username}</p>
                    {fullname && (
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {fullname}
                      </p>
                    )}
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setOpenProfile(false);
                      }}
                      className="block w-full text-left px-4 py-1.5 text-gray-300 hover:bg-[#1f6feb] hover:text-white transition-colors"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/movie");
                        setOpenProfile(false);
                      }}
                      className="block w-full text-left px-4 py-1.5 text-gray-300 hover:bg-[#1f6feb] hover:text-white transition-colors"
                    >
                      Back to Movies
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#30363d]">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-1.5 text-gray-300 hover:bg-[#1f6feb] hover:text-white transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
