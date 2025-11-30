const Header = () => {
  return (
    <div className="relative w-full h-[450px] bg-header bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#181A1C]"></div>

      <div className="absolute bottom-10 left-12 max-w-xl space-y-4">
        <h1 className="text-4xl text-white font-bold">Duty After School</h1>
        <p className="text-gray-300 text-sm">
          An unidentified object has seized control of the world. In a moment of
          urgent decision...
        </p>

        <div className="flex items-center gap-3 mt-4">
          <button className="px-6 py-2 bg-white text-black rounded-lg font-semibold">
            Play
          </button>
          <button className="px-6 py-2 border text-white border-white rounded-lg">
            More
          </button>
          <span className="border p-1 rounded text-white text-xs">18+</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
