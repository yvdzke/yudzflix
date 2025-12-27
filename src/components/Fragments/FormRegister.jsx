import InputForm from "../Elements/Input/index.jsx";
import Button from "../Elements/Button/Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux
import { registerAuth } from "../../store/authSlice";

const FormRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please Enter Username or Password");
      return;
    }

    const userData = { username, password };

    dispatch(registerAuth(userData))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        alert(err || "Register Failed. Please try again.");
      });
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <InputForm
        name="username"
        label="Create Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Create Username"
      />

      <InputForm
        name="password"
        label="Create Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="****"
      />

      <Button
        type="submit"
        disabled={loading}
        varian={`w-full py-3 rounded-full font-medium transition-colors ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#3D4142] hover:bg-gray-700"
        }`}
      >
        {loading ? "Registering..." : "Register"}
      </Button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
};

export default FormRegister;
