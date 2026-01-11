import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const tokenRedux = useSelector((state) => state.auth.token);

  const tokenLocal = localStorage.getItem("token");

  if (!tokenRedux && !tokenLocal) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
