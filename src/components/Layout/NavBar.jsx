import { MdMovie } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const hideAuthLinks =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="fixed flex items-center justify-between top-0 left-0 right-0 bg-transparent py-4 px-4 shadow">
      {/* LOGO */}
      <Link
        to="/home"
        className="flex items-center gap-2 font-bold text-white text-1xl"
      >
        <MdMovie className="text-3xl" />
        YudzFlix
      </Link>

      {/* MENU RIGHT */}
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
    </nav>
  );
};

export default NavBar;
