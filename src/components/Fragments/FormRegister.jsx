import InputForm from "../Elements/Input/index.jsx";
import Button from "../Elements/Button/Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux (Pastikan nama importnya sesuai authSlice yang baru)
import { registerUser } from "../../store/authSlice";

const FormRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ambil state dari Redux
  const { loading, error } = useSelector((state) => state.auth);

  // State untuk input form (Sesuai kolom Database)
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [enterDetail, setEnterDetails] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Validasi kelengkapan data
    if (!fullname || !username || !email || !password) {
      setEnterDetails("Please fill in all fields!");
      return;
    }

    // Bungkus data
    const userData = { fullname, username, email, password };

    // Tembak ke Backend lewat Redux
    dispatch(registerUser(userData))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.error("Gagal Register:", err);
      });
  };

  return (
    <>
      <p className="text-red-600 text-center mb-2">{enterDetail}</p>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <InputForm
          name="fullname"
          label="Full Name"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Enter your full name"
        />

        {/* INPUT USERNAME */}
        <InputForm
          name="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Create Username"
        />

        {/* INPUT EMAIL (BARU) */}
        <InputForm
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
        />

        {/* INPUT PASSWORD */}
        <InputForm
          name="password"
          label="Password"
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
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            {typeof error === "string" ? error : error.message}
          </p>
        )}
      </form>
    </>
  );
};

export default FormRegister;
