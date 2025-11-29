import { useNavigate } from "react-router-dom";
import Button from "../components/Elements/Button/Button";

const MoviePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    navigate("/login");
  };
  return (
    <div className="items-center justify-center flex flex-col min-h-screen">
      <h1 className="font-bold text-2xl ">Movies Page!</h1>
      <Button
        type="button"
        onClick={handleLogout}
        varian=" py-3 hover:text-blue-700 transition-colors font-medium"
      >
        Logout
      </Button>
    </div>
  );
};

export default MoviePage;
