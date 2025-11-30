import Header from "../components/Fragments/Header";
import NavBar from "../components/Layout/NavBar";
import CircularGallery from "../components/Fragments/CircularGalery";
import Footer from "../components/Layout/Footer";

const MoviePage = () => {
  return (
    <div className="bg-[#181A1C]">
      <NavBar></NavBar>
      <Header></Header>

      <div className="w-full h-[500px] flex flex-col items-center justify-center relative">
        <h2 className="absolute text-3xl font-semibold text-white top-20 text-center">
          Movies
        </h2>
        <CircularGallery
          bend={0}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MoviePage;
