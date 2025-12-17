import InputForm from "../Elements/Input/index.jsx";
import Button from "../Elements/Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { getUser } from "../../services/auth.service.js";

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

    getUser((users) => {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!user) {
        alert("Username or password is incorrect");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLogin", "true");

      navigate("/movie");
    });
  };

  const emailRef = useRef(null);

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        name="username"
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        type="username"
        value={username}
        placeholder="Enter Your Username"
        ref={emailRef}
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
