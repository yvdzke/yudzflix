import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // 1. Cek Token dari Redux
  const tokenRedux = useSelector((state) => state.auth.token);

  // 2. Cek Token dari LocalStorage (Buat cadangan kalau Redux belum siap/refresh)
  const tokenLocal = localStorage.getItem("token");

  // Logic: Kalau di Redux GAK ADA, DAN di LocalStorage juga GAK ADA...
  if (!tokenRedux && !tokenLocal) {
    // ...Tendang balik ke Login
    return <Navigate to="/login" replace />;
  }

  // Kalau ada token (di salah satu tempat), izinkan masuk
  return children;
};

export default ProtectedRoute;
