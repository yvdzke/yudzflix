import React, { useState } from "react";
import { Pencil, User, AlertTriangle, ChevronDown } from "lucide-react";

// Component
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
import MovieSection from "../components/Layout/MovieSection";

const ProfilePage = () => {
  // 1. Data User (Sesuai Tabel User di ERD)
  const [user, setUser] = useState({
    username: "William",
    email: "william1980@gmail.com",
    password: "****************",
    avatar: "https://i.pravatar.cc/150?u=william", // Avatar placeholder
  });

  // 2. Data MyList (Sesuai Tabel MyList & Series_Film di ERD)
  const myList = [
    {
      id: 1,
      title: "All of Us Are Dead",
      image: "https://image.tmdb.org/t/p/w500/pTEFqAjLd5YTsMD6NSUxV6Dq7A6.jpg",
      tag: "Top 10",
    },
    {
      id: 2,
      title: "Big Hero 6",
      image: "https://image.tmdb.org/t/p/w500/2mxS4wUimwlLmI1xp6QW6NSU361.jpg",
      tag: "Episode Baru",
    },
    {
      id: 3,
      title: "My Hero Academia",
      image: "https://image.tmdb.org/t/p/w500/ivOLM47yJt90P19RH1dQoYE6zNf.jpg",
      tag: "Episode Baru",
    },
    {
      id: 4,
      title: "Blue Lock",
      image: "https://image.tmdb.org/t/p/w500/veM5Pq6y8B34t8d82V0uHjF8yvj.jpg",
      tag: "Episode Baru",
    },
    {
      id: 5,
      title: "Ted Lasso",
      image:
        "https://image.tmdb.org/t/p/w500/q32w24cR76E3n5J5q32w24cR76E3n5.jpg",
      tag: "Top 10",
    }, // Link gambar broken, ganti sendiri ya
    {
      id: 6,
      title: "Duty After School",
      image: "https://image.tmdb.org/t/p/w500/pD6sL4vntUOWbaZsa3SmG6hKq7j.jpg",
      tag: "Episode Baru",
    },
  ];

  return (
    <div className="min-h-screen bg-[#181818] text-white font-sans">
      <NavBar></NavBar>

      {/* --- CONTENT UTAMA --- */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Layout Grid: Kiri (Form) - Kanan (Status Langganan) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* BAGIAN KIRI: Edit Profil */}
          <div className="md:col-span-7">
            <h2 className="text-2xl font-semibold mb-6">Profil Saya</h2>

            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-700"
              />
              <button className="text-blue-500 text-sm font-medium border border-blue-500 px-4 py-1.5 rounded-full hover:bg-blue-500 hover:text-white transition">
                Ubah Foto
              </button>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
              {/* Input Nama */}
              <div className="bg-[#222222] border border-gray-700 rounded p-3 flex justify-between items-center group focus-within:border-white transition">
                <div className="w-full">
                  <label className="block text-gray-400 text-xs mb-1">
                    Nama Pengguna
                  </label>
                  <input
                    type="text"
                    value={user.username}
                    className="bg-transparent w-full text-white outline-none font-medium"
                    readOnly // Kasih readOnly dulu kalau belum ada logic edit
                  />
                </div>
                <Pencil
                  size={16}
                  className="text-gray-500 group-hover:text-white cursor-pointer"
                />
              </div>

              {/* Input Email */}
              <div className="bg-[#222222] border border-gray-700 rounded p-3 flex justify-between items-center group">
                <div className="w-full">
                  <label className="block text-gray-400 text-xs mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="bg-transparent w-full text-gray-300 outline-none"
                    readOnly
                  />
                </div>
                {/* Email biasanya gak bisa diedit sembarangan, jadi ga dikasih icon pencil */}
              </div>

              {/* Input Kata Sandi */}
              <div className="bg-[#222222] border border-gray-700 rounded p-3 flex justify-between items-center group focus-within:border-white transition">
                <div className="w-full">
                  <label className="block text-gray-400 text-xs mb-1">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    value={user.password}
                    className="bg-transparent w-full text-white outline-none tracking-widest"
                    readOnly
                  />
                </div>
                <Pencil
                  size={16}
                  className="text-gray-500 group-hover:text-white cursor-pointer"
                />
              </div>
            </div>

            {/* Tombol Simpan */}
            <button className="mt-8 bg-blue-700 hover:bg-blue-600 text-white px-8 py-3 rounded font-semibold transition w-full md:w-auto">
              Simpan
            </button>
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

        {/* --- DAFTAR SAYA (MY LIST) --- */}
        <MovieSection></MovieSection>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default ProfilePage;
