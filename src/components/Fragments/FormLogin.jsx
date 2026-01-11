import InputForm from "../Elements/Input/index.jsx";
import Button from "../Elements/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import action yang baru
import { loginUser } from "../../store/authSlice";

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  // Backend minta login via Email
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enterDetail, setEnterDetails] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setEnterDetails("Please enter your email and password");
      return;
    }

    // Dispatch action loginUser
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        // Kalau sukses, redirect ke home/movie
        navigate("/movie");
      })
      .catch((err) => {
        setEnterDetails("Incorrect Email or Password", err);
      });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {(enterDetail || error) && (
        <p className="text-red-600 text-center">
          {enterDetail || (typeof error === "string" ? error : "Login Failed")}
        </p>
      )}

      {/* Ganti Username jadi Email */}
      <InputForm
        name="email"
        label="Email"
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputForm
        name="password"
        label="Password"
        type="password"
        value={password}
        placeholder="****"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        disabled={loading}
        varian="w-full py-3 bg-[#3D4142] rounded-full hover:bg-gray-700 transition-colors font-medium"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default FormLogin;
