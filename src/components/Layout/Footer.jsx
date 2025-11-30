const Footer = () => {
  return (
    <footer className="w-full bg-[#181A1C] text-gray-300 py-12 ">
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
            <li>Action</li>
            <li>Kids</li>
            <li>Anime</li>
            <li>British</li>
            <li>Drama</li>
            <li>Science Fiction & Fantasy</li>
            <li>Crime</li>
            <li>K-Drama</li>
            <li>Comedy</li>
            <li>Adventure</li>
            <li>War</li>
            <li>Romance</li>
            <li>Science & Nature</li>
            <li>Thriller</li>
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
