import NavBar from "../components/Layout/NavBar";
import FrameIP from "../assets/iPhone-12-Pro.png";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-movie-3 bg-cover flex items-center relative overflow-hidden">
      <NavBar></NavBar>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-20">
        {/* LEFT */}
        <div className="">
          <p className="text-sm tracking-[3px] text-white uppercase">
            Movie Streaming Platform
          </p>

          <h1 className="text-6xl font-bold text-white mt-3">YudzFlix</h1>

          <p className="text-gray-300 mt-6 leading-relaxed">
            YudzFlix adalah aplikasi berbasis web yang dirancang untuk memberi
            pengguna akses ke library film dan acara TV yang luas dari perangkat
            mereka. Chill menawarkan antarmuka yang ramah pengguna yang
            memungkinkan pengguna mencari film dan acara TV, dan mulai menonton
            secara instan. Chill menawarkan rekomendasi hasil personalisasi
            berdasarkan kebiasaan menonton pengguna, membantu pengguna menemukan
            film dan acara TV baru yang mungkin tidak mereka temukan sebelumnya.
            Selain itu, Chill juga menawarkan konten orisinal, termasuk film dan
            acara TV, yang hanya dapat ditemukan di aplikasi Chill.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center items-center">
          <img
            src={FrameIP}
            className="w-[600px] absolute bottom-[-4%] rotate-6 drop-shadow-2xl"
            alt="app preview"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
