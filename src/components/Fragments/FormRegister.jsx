import InputForm from "../Elements/Input/index.jsx";
import Button from "../Elements/Button/Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please Enter Username or Password");
      return;
    }

    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Account created! Thanks for joining us.");
    navigate("/login");
  };

  return (
    <form onSubmit={handleRegister}>
      <InputForm
        name="username"
        label=" Create Username"
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
        type=""
        varian="w-full py-3 bg-[#3D4142] rounded-full hover:bg-gray-700 transition-colors font-medium"
      >
        Register
      </Button>
    </form>
  );
};
export default FormRegister;
