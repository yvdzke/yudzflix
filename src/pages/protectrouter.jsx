import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { children } = props;
  const isLogin = localStorage.getItem("isLogin");

  if (!isLogin) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
