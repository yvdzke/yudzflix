import { useState, useEffect } from "react";
import { MdMovie } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteUser } from "../../services/auth.service";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Delete User Logic
  const handleDeleteUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userId = JSON.parse(storedUser).id;
      console.log("USER ID:", userId);
      deleteUser(userId).then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      });
    }
  };

  const hideAuthLinks =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/movie";

  const hideBeranda =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const storedUser = localStorage.getItem("user");
  const profileUser = storedUser ? JSON.parse(storedUser).username : "User";

  return (
    <nav
      className={`fixed z-50 flex items-center justify-between top-0 left-0 right-0 px-4 py-4 transition-all duration-300
      ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center gap-2 font-bold text-white text-xl"
      >
        <MdMovie className="text-3xl" />
        YudzFlix
      </Link>

      {/* MENU */}
      {!hideBeranda && (
        <div className="mr-auto ml-10">
          <ul className="flex gap-6 text-white font-medium">
            <li className="cursor-pointer hover:text-gray-400">Series</li>
            <li className="cursor-pointer hover:text-gray-400">Film</li>
            <li className="cursor-pointer hover:text-gray-400">
              My Movie List
            </li>
          </ul>
        </div>
      )}

      {/* AUTH */}
      {!hideAuthLinks && (
        <div className="flex items-center gap-4 mr-4">
          <Link
            to="/login"
            className="text-white w-20 h-7 text-center rounded-md border bg-transparent hover:border-indigo-500"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white w-20 h-7 text-center rounded-md border bg-transparent hover:border-indigo-500"
          >
            Register
          </Link>
        </div>
      )}

      {/* PROFILE DROPDOWN */}
      {!hideBeranda && (
        <div className="relative mr-4">
          {/* Trigger */}
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <p className="text-white font-bold">{profileUser}</p>
            <img
              src="https://res.cloudinary.com/dvym5vxsw/image/upload/v1766191504/mypp_h0ujrc.jpg"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </div>

          {/* Dropdown */}
          {openProfile && (
            <div className="absolute right-0 mt-3 w-48 bg-black border border-gray-700 rounded-md shadow-lg">
              <button
                onClick={() => {
                  navigate("/profile");
                  setOpenProfile(false);
                }}
                className="block w-full text-left px-4 py-3 text-white hover:bg-gray-800"
              >
                Go to Profile
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-red-400 hover:bg-gray-800"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteUser}
                className="block w-full text-left px-4 py-3 text-red-400 hover:bg-gray-800"
              >
                Delete User
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
