import { MdMovie } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideAuthLinks =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/movie";

  const hideBeranda =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isMoviePage = location.pathname === "/movie";

  return (
    <nav
      className={`fixed z-50 flex items-center justify-between top-0 left-0 right-0 py-4 px-4 shadow
      ${isMoviePage ? "bg-transparent" : "bg-transparent"}`}
    >
      {/* yvdz Logo */}
      <Link
        to="/home"
        className="flex items-center gap-2 font-bold text-white text-1xl"
      >
        <MdMovie className="text-3xl" />
        YudzFlix
      </Link>

      {/* NavBar Auth */}
      {!hideAuthLinks && (
        <div className="flex items-center gap-4 mr-4">
          <Link to="/login" className="text-white hover:text-blue-600">
            Login
          </Link>
          <Link
            to="/register"
            className="text-white px-3 py-1 hover:text-blue-600"
          >
            Register
          </Link>
        </div>
      )}

      {/* NavBar MoviePage */}
      {!hideBeranda && (
        <div className="flex items-center gap-4 mr-4">
          <Link to="/movie" className="text-white hover:text-blue-600">
            Recently Movies
          </Link>
          <Link
            to="/movie"
            className="text-white px-0 py-1 hover:text-blue-600"
          >
            Dashboard
          </Link>
          <Link
            to="/movie"
            className="text-white px-1 py-1 hover:text-blue-600"
          >
            Series
          </Link>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="px-1 py-1  text-white hover:text-blue-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
