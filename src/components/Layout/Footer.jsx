const Footer = () => {
  return (
    <footer className="w-full bg-[#181A1C] border border-gray-700 text-gray-300 py-12 ">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-white text-2xl font-bold mb-3 flex items-center gap-2">
            YudzFlix
          </h2>
          <p className="text-sm">@2025 YudzFlix All Rights Reserved.</p>
        </div>

        {/* Genre Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Genres</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#toprated">Action</a>
            </li>
            <li href="#">Kids</li>
            <li href="#">Anime</li>
            <li href="#">British</li>
            <li href="#">Drama</li>
            <li href="#">Science Fiction & Fantasy</li>
            <li href="#">Crime</li>
            <li href="#">K-Drama</li>
            <li href="#">Comedy</li>
            <li href="#">Adventure</li>
            <li href="#">War</li>
            <li href="#">Romance</li>
            <li href="#">Science & Nature</li>
            <li href="#">Thriller</li>
          </ul>
        </div>

        <div></div>
        <div>
          <h3 className="text-white font-semibold mb-4">Help</h3>
          <ul className="space-y-2 text-sm">
            <li>FAQ</li>
            <li>Contact Us</li>
            <li>Privacy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
