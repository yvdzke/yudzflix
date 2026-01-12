import { useState } from "react";
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

  // Ambil state loading & error saja, token gak usah dipantau di sini
  const { loading, error } = useSelector((state) => state.auth);

  // State Lokal Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMassege, setErrMassege] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrMassege("Please fill in all fields!");
      return;
    }

    setErrMassege("");
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/movie");
        // window.location.href = "/movie";
      })
      .catch((err) => {
        setErrMassege(err);
      });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {/* TAMPILAN ERROR */}
      {errMassege && (
        <div className="bg-red-500/10 border border-red-500 rounded p-2 text-center">
          <p className="text-white text-sm font-medium">{errMassege}</p>
        </div>
      )}

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
