import React, { useState, useEffect, useRef } from "react";
import { Pencil, AlertTriangle, User as UserIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Button from "../components/Elements/Button/Button";

// Cek: Kalau lagi di laptop (Dev) pake localhost, kalau udah deploy pake Vercel
const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://yudzflix-backend.vercel.app";

// Actions
import { loginSuccess } from "../store/authSlice";

// Component
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import MovieSection from "../components/Layout/MovieSection";

const ProfilePage = () => {
  const dispatch = useDispatch();

  // 1. Ambil Data User DAN Token dari Redux
  // Token ini PENTING buat izin update ke database!
  const { user, token } = useSelector((state) => state.auth);
  const { movies: favorites } = useSelector((state) => state.favorite);

  const fileInputRef = useRef(null);

  // State Lokal
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [fileImage, setFileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // 2. Sinkronisasi Data Awal
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
      setPreviewImage(user.avatar || null);
    }
  }, [user]);

  // Handle Ketik Input (Username)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTriggerFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsEditing(true);
    }
  };

  // 🔥 3. LOGIKA SIMPAN (SUDAH DIPERBAIKI: UPDATE KE DATABASE)
  const handleSave = async () => {
    // Cek Token Dulu
    if (!token) {
      alert("Sesi habis, silakan login ulang!");
      return;
    }

    try {
      let finalAvatarUrl = user?.avatar; // Default pake avatar lama

      // A. STEP 1: Kalau ada file baru, Upload dulu!
      if (fileImage) {
        const uploadData = new FormData();
        uploadData.append("file", fileImage);

        const uploadRes = await axios.post(
          `${API_BASE_URL}/api/upload/avatar`,
          uploadData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        finalAvatarUrl = uploadRes.data.imageUrl;
        console.log("✅ Sukses Upload Gambar:", finalAvatarUrl);
      }

      // B. STEP 2: Update ke Database (Username & Avatar)
      // Kita pakai data dari 'formData.username' yang baru diketik user
      const bodyData = {
        username: formData.username,
        avatar: finalAvatarUrl,
      };

      console.log("🚀 Mengirim Data ke Database:", bodyData);

      // Konfigurasi Header (Wajib bawa Token)
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Tembak Endpoint PUT
      // INI YANG TADI KURANG! SEKARANG UDAH ADA.
      const updateRes = await axios.put(
        `${API_BASE_URL}/api/users/profile`,
        bodyData,
        config
      );

      console.log("✅ Respon Database:", updateRes.data);

      // C. STEP 3: Update State Frontend (Redux & LocalStorage)
      // Pakai data fresh yang dikembalikan oleh Backend biar sinkron 100%
      const updatedUserFromBackend = updateRes.data.user;

      // Gabungkan token lama (karena backend update profile gak balikin token baru)
      const finalUserDataForRedux = {
        ...updatedUserFromBackend,
        token: token,
      };

      localStorage.setItem("user", JSON.stringify(finalUserDataForRedux));
      dispatch(loginSuccess(finalUserDataForRedux));

      alert("Profil berhasil diperbarui!");
      setIsEditing(false);
      setFileImage(null);
    } catch (error) {
      console.error("Gagal menyimpan profil:", error);
      const msg =
        error.response?.data?.message ||
        "Terjadi kesalahan saat menyimpan data.";
      alert(msg);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFileImage(null);
    setPreviewImage(user?.avatar || null);
    setFormData({
      username: user.username || "",
      email: user.email || "",
    });
  };

  return (
    <div className="min-h-screen bg-[#181818] text-white font-sans">
      <NavBar />

      <main className="max-w-6xl mx-auto px-6 py-10 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* BAGIAN KIRI: Form Edit Profil */}
          <div className="md:col-span-7">
            <h2 className="text-2xl font-semibold mb-6">Profil Saya</h2>

            {/* Area Avatar */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full border-2 border-gray-700 overflow-hidden bg-gray-800 flex items-center justify-center relative">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={40} className="text-gray-400" />
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <button
                onClick={handleTriggerFile}
                className="text-blue-500 text-sm font-medium border border-blue-500 px-4 py-1.5 rounded-full hover:bg-blue-500 hover:text-white transition"
              >
                Ubah Foto
              </button>
            </div>

            {/* Area Input Form */}
            <div className="space-y-4">
              <div
                className={`bg-[#222222] border rounded p-3 flex justify-between items-center group transition ${
                  isEditing ? "border-white" : "border-gray-700"
                }`}
              >
                <div className="w-full">
                  <label className="block text-gray-400 text-xs mb-1">
                    Nama Pengguna
                  </label>
                  {/* INPUT USERNAME */}
                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-transparent w-full text-white outline-none font-medium"
                    readOnly={!isEditing}
                  />
                </div>
                {!isEditing && (
                  <Pencil
                    size={16}
                    onClick={() => setIsEditing(true)}
                    className="text-gray-500 hover:text-white cursor-pointer"
                  />
                )}
              </div>

              {/* Input Email (Readonly) */}
              <div className="bg-[#222222] border border-gray-700 rounded p-3 flex justify-between items-center opacity-70 cursor-not-allowed">
                <div className="w-full">
                  <label className="block text-gray-400 text-xs mb-1">
                    Email (Tidak dapat diubah)
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    className="bg-transparent w-full text-gray-300 outline-none"
                    readOnly
                  />
                </div>
              </div>

              {/* Input Password (Dummy) */}
              <div className="bg-[#222222] border border-gray-700 rounded p-3 flex justify-between items-center group">
                <div className="w-full">
                  <label className="block text-gray-400 text-xs mb-1">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    value="dummyPass123"
                    className="bg-transparent w-full text-white outline-none tracking-widest"
                    readOnly
                  />
                </div>
                <button className="text-xs text-blue-500 hover:text-white">
                  Ganti
                </button>
              </div>
            </div>

            {/* Tombol Aksi */}
            {isEditing && (
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSave}
                  className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-2 rounded font-semibold transition"
                >
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="border border-gray-500 hover:border-white text-gray-300 hover:text-white px-8 py-2 rounded font-semibold transition"
                >
                  Batal
                </button>
              </div>
            )}
          </div>

          {/* BAGIAN KANAN */}
          <div className="md:col-span-5">
            <div className="bg-[#222222] border border-gray-700 rounded-lg p-6 flex flex-col gap-4 items-start">
              <div className="bg-gray-700 p-2 rounded-full inline-block">
                <AlertTriangle className="text-yellow-400" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">
                  Saat ini anda belum berlangganan
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series Kesukaan
                  Kamu!
                </p>
              </div>
              <div className="w-full flex justify-end mt-2">
                <button className="bg-[#2F2F2F] text-white px-6 py-2 rounded-full font-semibold border border-gray-600 hover:bg-white hover:text-black transition">
                  Mulai Berlangganan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN FAVORIT */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">My Watch List</h2>
          {favorites.length > 0 ? (
            <MovieSection customSlide={5} title="" movies={favorites} />
          ) : (
            <div className="text-center py-10 bg-[#222222] rounded-lg border border-gray-700 border-dashed">
              <p className="text-gray-400">No favorite movies yet.</p>
              <Button
                onClick={() => (window.location.href = "/movie")}
                varian="text-blue-500 mt-2 hover:underline"
              >
                Explore Movie
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
