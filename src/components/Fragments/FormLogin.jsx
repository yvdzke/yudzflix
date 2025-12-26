import InputForm from "../Elements/Input/index.jsx";
import Button from "../Elements/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAuth } from "../../store/authSlice";

const FormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [enterDetail, setEnterDetails] = useState("");

  const usernameRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setEnterDetails("Please enter your details");
      return;
    }

    dispatch(loginAuth({ username, password })).then((res) => {
      if (!res.error) {
        navigate("/movie");
      }
    });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {(enterDetail || error) && (
        <p className="text-red-600">{enterDetail || error}</p>
      )}

      <InputForm
        ref={usernameRef}
        name="username"
        label="Username"
        type="text"
        value={username}
        placeholder="Enter your username"
        onChange={(e) => setUsername(e.target.value)}
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
