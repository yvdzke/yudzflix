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
          <h3 className="text-white font-semibold mb-4">Genre</h3>
          <ul className="space-y-2 text-sm">
            <li>Aksi</li>
            <li>Anak-anak</li>
            <li>Anime</li>
            <li>Britania</li>
            <li>Drama</li>
            <li>Fantasi Ilmiah & Fantasi</li>
            <li>Kejahatan</li>
            <li>KDrama</li>
            <li>Komedi</li>
            <li>Petualangan</li>
            <li>Perang</li>
            <li>Romantis</li>
            <li>Sains & Alam</li>
            <li>Thriller</li>
          </ul>
        </div>
        <div></div>
        <div>
          <h3 className="text-white font-semibold mb-4">Bantuan</h3>
          <ul className="space-y-2 text-sm">
            <li>FAQ</li>
            <li>Kontak Kami</li>
            <li>Privasi</li>
            <li>Syarat & Ketentuan</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
