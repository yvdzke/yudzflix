import React, { useState, useEffect } from "react";
import { Pencil, AlertTriangle, User as UserIcon } from "lucide-react"; // Rename User biar gak bentrok sama variable
import { useSelector, useDispatch } from "react-redux";

// Component
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import CardMovies from "../components/Fragments/CardMovies"; // Kita pakai CardMovies langsung atau MovieSection kalau support props

const ProfilePage = () => {
  // 1. Ambil Data dari Redux (Sesuai source of truth)
  const { user } = useSelector((state) => state.auth);
  const { movies: favorites } = useSelector((state) => state.favorite);

  // 2. State Lokal untuk Form Edit
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    // Password gak kita tampilin/edit disini demi keamanan, biasanya ada menu ganti password terpisah
  });

  // 3. Sinkronisasi Data Redux ke State Lokal
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Handle Perubahan Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Simpan (Sementara log dulu, nanti disambung ke API update profile)
  const handleSave = () => {
    console.log("Data disimpan:", formData);
    setIsEditing(false);
    // Disini nanti dispatch(updateUser(formData)) ke backend
  };

  return (
    <div className="min-h-screen bg-[#181818] text-white font-sans">
      <NavBar />

      {/* --- CONTENT UTAMA --- */}
      <main className="max-w-6xl mx-auto px-6 py-10 pt-24">
        {/* Layout Grid: Kiri (Form) - Kanan (Status Langganan) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* BAGIAN KIRI: Edit Profil */}
          <div className="md:col-span-7">
            <h2 className="text-2xl font-semibold mb-6">Profil Saya</h2>

            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full border-2 border-gray-700 overflow-hidden bg-gray-800 flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={40} className="text-gray-400" />
                )}
              </div>
              <button className="text-blue-500 text-sm font-medium border border-blue-500 px-4 py-1.5 rounded-full hover:bg-blue-500 hover:text-white transition">
                Ubah Foto
              </button>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
              {/* Input Nama */}
              <div
                className={`bg-[#222222] border rounded p-3 flex justify-between items-center group transition
                ${isEditing ? "border-white" : "border-gray-700"}`}
              >
                <div className="w-full">
                  <label className="block text-gray-400 text-xs mb-1">
                    Nama Pengguna
                  </label>
                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-transparent w-full text-white outline-none font-medium"
                    readOnly={!isEditing}
                  />
                </div>
                {/* Tombol Edit Trigger */}
                {!isEditing && (
                  <Pencil
                    size={16}
                    onClick={() => setIsEditing(true)}
                    className="text-gray-500 hover:text-white cursor-pointer"
                  />
                )}
              </div>

              {/* Input Email */}
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

              {/* Input Kata Sandi (Dummy view) */}
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

            {/* Tombol Simpan / Batal */}
            {isEditing && (
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSave}
                  className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-2 rounded font-semibold transition"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-500 hover:border-white text-gray-300 hover:text-white px-8 py-2 rounded font-semibold transition"
                >
                  Batal
                </button>
              </div>
            )}
          </div>

          {/* BAGIAN KANAN: Status Langganan (Paket) */}
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

        {/* --- DAFTAR SAYA (MY LIST - SLIDER) --- */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Daftar Saya</h2>

          {favorites.length > 0 ? (
            // 👇 GANTI GRID JADI FLEX SLIDER
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
              {favorites.map((movie) => (
                // 👇 Bungkus pakai div flex-shrink-0 biar kartu gak gepeng
                <div key={movie.id} className="flex-shrink-0 w-[200px]">
                  <CardMovies variant="portrait">
                    <CardMovies.CardImage
                      img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      name={movie.title}
                      variant="portrait"
                    />
                    <CardMovies.Overlay
                      movie={movie}
                      original_title={movie.title}
                    />
                  </CardMovies>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-[#222222] rounded-lg border border-gray-700 border-dashed">
              <p className="text-gray-400">
                Belum ada film di daftar favoritmu.
              </p>
              <button
                onClick={() => (window.location.href = "/movie")}
                className="text-blue-500 text-sm mt-2 hover:underline"
              >
                Cari Film
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
