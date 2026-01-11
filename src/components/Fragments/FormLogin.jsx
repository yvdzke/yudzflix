import { useState, useEffect } from "react"; // ✅ Tambah useEffect
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components
import InputForm from "../Elements/Input/index.jsx";
import Button from "../Elements/Button/Button.jsx";

// Redux Action
import { loginUser } from "../../store/authSlice";

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil state dari Redux
  const { loading, error, token } = useSelector((state) => state.auth);

  // State Lokal Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  // Kalau token sudah ada langsung ke /movie
  useEffect(() => {
    if (token) {
      navigate("/movie");
    }
  }, [token, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi input kosong
    if (!email || !password) {
      setLocalError("Please enter your email and password");
      return;
    }

    // Reset error sebelum request baru
    setLocalError("");

    // Dispatch action login
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/movie");
      })
      .catch((err) => {
        // Kalau Gagal:
        console.error("Login Error:", err);
        // Tampilkan pesan error dari backend atau default
        setLocalError(err || "Incorrect Email or Password");
      });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {/* TAMPILAN ERROR */}
      {(localError || error) && (
        <div className="bg-red-500/10 border border-red-500 rounded p-2 text-center">
          <p className="text-red-500 text-sm font-medium">
            {localError || (typeof error === "string" ? error : "Login Failed")}
          </p>
        </div>
      )}

      {/* INPUT EMAIL */}
      <InputForm
        name="email"
        label="Email"
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* INPUT PASSWORD */}
      <InputForm
        name="password"
        label="Password"
        type="password"
        value={password}
        placeholder="****"
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* TOMBOL LOGIN */}
      <Button
        type="submit"
        disabled={loading}
        varian={`w-full py-3 rounded-full font-medium transition-colors 
          ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#3D4142] hover:bg-gray-700 text-white"
          }`}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default FormLogin;
