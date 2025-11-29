import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import MoviePage from "./pages/movie.jsx";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ErrorPage from "./pages/404.jsx";
import Home from "./pages/home.jsx";
import ProtectedRoute from "./pages/protectrouter.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div></div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/movie",
    element: (
      <ProtectedRoute>
        <MoviePage />
      </ProtectedRoute>
    ),
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
