import { MdMovie } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Elements/Button/Button";
import Mypp from "../../assets/img/mypp.jpg";

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
    navigate("/");
  };
  const storedUser = localStorage.getItem("user");
  const profileUser = storedUser ? JSON.parse(storedUser).username : null;

  const alertName = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      alert(`Hello.. ${user.username}`);
    }
  };

  const isMoviePage = location.pathname === "/movie";

  return (
    <nav
      className={`fixed z-50 flex items-center justify-between top-0 left-0 right-0 py-4 px-4 shadow
      ${isMoviePage ? "bg-transparent" : "bg-transparent"}`}
    >
      {/* yvdz Logo */}
      <Link
        to="/"
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
          <div className="flex gap-2">
            <p
              onClick={alertName}
              className="text-white font-bold mt-3 cursor-pointer"
            >
              {profileUser}
            </p>
            <img
              className="w-12 h-12 rounded-full bg-cover"
              src={Mypp}
              alt=""
            />
          </div>
          {/* Logout Button */}
          <Button
            varian="text-white w-20 h-7 rounded-md border bg-transparent hover:border-indigo-500"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
