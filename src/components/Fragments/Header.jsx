import { useEffect, useRef, useState } from "react";

const Header = () => {
  const youtubeId = "TcMBFSGVi1c"; // ganti sesuai trailer
  const playerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Load YouTube Iframe API
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        createPlayer();
      } else {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        window.onYouTubeIframeAPIReady = createPlayer;
      }
    };

    const createPlayer = () => {
      playerRef.current = new window.YT.Player("yt-bg", {
        events: {
          onReady: (event) => {
            event.target.playVideo();
            event.target.mute(); // autoplay harus mute
          },
        },
      });
    };

    loadYouTubeAPI();

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const toggleMute = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }

    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative w-full h-[450px] overflow-hidden">
      {/* YOUTUBE BACKGROUND */}
      <iframe
        id="yt-bg"
        className="absolute top-1/2 left-1/2 w-[120%] h-[120%]
                   -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=${youtubeId}&enablejsapi=1`}
        frameBorder="0"
        allow="autoplay; fullscreen"
        title="YouTube background"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#181A1C]" />

      {/* CONTENT */}
      <div className="absolute bottom-10 left-12 max-w-xl space-y-4 z-10">
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

          {/* AGE + UNMUTE */}
          <div className="flex items-center gap-2">
            <span className="border p-1 rounded text-white text-xs">18+</span>

            <button
              onClick={toggleMute}
              className="border p-1 rounded text-white text-xs
                         hover:bg-white/20 transition"
              aria-label="Toggle sound"
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
