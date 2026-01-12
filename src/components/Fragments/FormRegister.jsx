import InputForm from "../Elements/Input/index.jsx";
import Button from "../Elements/Button/Button.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../../store/authSlice";

const FormRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ambil loading state dari Redux
  const { isLoading } = useSelector((state) => state.auth);

  // State Form
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 1. State Baru

  // State Error
  const [enterDetail, setEnterDetails] = useState("");

  // Reset error saat halaman dibuka
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleRegister = (e) => {
    e.preventDefault();
    setEnterDetails(""); // Bersihkan error lama

    // 2. Validasi Input Kosong
    if (!fullname || !username || !email || !password || !confirmPassword) {
      setEnterDetails("Please fill in all fields!");
      return;
    }

    // 3. Validasi Password Match
    if (password !== confirmPassword) {
      setEnterDetails("Passwords do not match!");
      return;
    }

    const userData = { fullname, username, email, password };

    dispatch(registerUser(userData))
      .unwrap()
      .then((res) => {
        // Sukses
        alert(res.message || "Check your email to verify your account!");
        navigate("/login");
      })
      .catch((err) => {
        setEnterDetails(err);
      });
  };

  return (
    <>
      {/* Tampilan Error (Merah) */}
      {enterDetail && (
        <div className="bg-red-500/10 border border-red-500 rounded p-2 text-center mb-4">
          <p className="text-white text-sm font-medium">{enterDetail}</p>
        </div>
      )}

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <InputForm
          name="fullname"
          label="Full Name"
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Enter your full name"
        />

        <InputForm
          name="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Create Username"
        />

        <InputForm
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
        />

        <InputForm
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="****"
        />

        {/* 5. Input Confirm Password (Baru) */}
        <InputForm
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />

        <Button
          type="submit"
          disabled={isLoading}
          varian={`w-full py-3 rounded-full font-medium transition-colors ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#3D4142] hover:bg-gray-700"
          }`}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </>
  );
};

export default FormRegister;
