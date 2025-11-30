import NavBar from "../components/Layout/NavBar";
import FrameIP from "../assets/iPhone-12-Pro.png";
import SplashCursor from "../components/ReactBit/CursorSplash";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-movie-3 bg-cover flex items-center relative overflow-hidden">
      <SplashCursor />
      <NavBar></NavBar>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-20">
        {/* LEFT */}
        <div className="">
          <p className="text-sm tracking-[3px] text-white uppercase">
            Movie Streaming Platform
          </p>

          <h1 className="text-6xl font-bold text-white mt-3">YudzFlix</h1>

          <p className="text-gray-300 mt-6 leading-relaxed">
            YudzFlix is a web-based application designed to give users access to
            a wide library of movies and TV shows from their devices. YudzFlix
            offers a user-friendly interface that allows users to search for
            movies and TV shows and start watching instantly. It provides
            personalized recommendations based on users’ viewing habits, helping
            them discover new movies and shows they might not have found
            otherwise. In addition, YudzFlix offers original content, including
            exclusive movies and TV series that can only be found on the
            YudzFlix platform.
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
