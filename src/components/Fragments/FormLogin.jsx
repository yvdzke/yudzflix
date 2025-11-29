import InputForm from "../Elements/Input/index.jsx";
import Button from "../Elements/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FormLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please Enter Your Details");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("");
      return;
    }
    if (user.username === username && user.password === password) {
      localStorage.setItem("isLogin", "true");
      navigate("/movie");
    } else {
      alert("Username or password is incorrect");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        name="username"
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        type="username"
        value={username}
        placeholder="Enter Your Username"
      />

      <InputForm
        name="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        onClick={handleLogin}
        value={password}
        type="password"
        placeholder="****"
      />

      <Button
        type="submit"
        varian="w-full py-3 bg-[#3D4142] rounded-full hover:bg-gray-700 transition-colors font-medium"
      >
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
