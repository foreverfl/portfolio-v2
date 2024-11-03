import React, { useState, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";

interface Track {
  id: number;
  name: string;
  artist: string;
  src: string;
}

const AudioPlayer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const tracks: Track[] = [
    {
      id: 1,
      name: "野良猫は宇宙を目指した",
      artist: "しゃろう",
      src: "https://blog_workers.forever-fl.workers.dev/portfolio-stray-cat-space.mp3",
    },
    {
      id: 2,
      name: "2_23_AM",
      artist: "しゃろう",
      src: "https://blog_workers.forever-fl.workers.dev/portfolio-2-23-AM.mp3",
    },
    {
      id: 3,
      name: "10℃",
      artist: "しゃろう",
      src: "https://blog_workers.forever-fl.workers.dev/portfolio-10-degrees.mp3",
    },
    {
      id: 4,
      name: "パステルハウス",
      artist: "かずち",
      src: "https://blog_workers.forever-fl.workers.dev/portfolio-pastel-house.mp3",
    },
    {
      id: 5,
      name: "神隠しの真相",
      artist: "しゃろう",
      src: "https://blog_workers.forever-fl.workers.dev/portfolio-kamikakushi.mp3",
    },
  ];

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<ReactAudioPlayer>(null);

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.audioEl.current?.pause();
    } else {
      audioRef.current?.audioEl.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    const currentIndex = tracks.findIndex(
      (track) => track.id === selectedTrack?.id
    );
    const nextIndex = (currentIndex + 1) % tracks.length;
    setSelectedTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  const playPreviousTrack = () => {
    const currentIndex = tracks.findIndex(
      (track) => track.id === selectedTrack?.id
    );
    const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setSelectedTrack(tracks[previousIndex]);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-50 w-80 rounded-lg shadow-lg p-5 text-gray-800 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Now Playing</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="w-32 h-32 bg-blue-300 rounded-md mb-3 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">🎶</span>
          </div>
          <p className="text-lg font-medium">{selectedTrack?.name}</p>
          <p className="text-sm text-gray-500">{selectedTrack?.artist}</p>
        </div>

        <ReactAudioPlayer
          ref={audioRef}
          src={selectedTrack?.src}
          autoPlay={isPlaying}
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className="w-full bg-gray-200 h-1 rounded-full my-3">
          {/* Progress bar placeholder; can be further customized if needed */}
          <div className="bg-blue-500 h-full w-1/3 rounded-full"></div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>1:12</span>
          <span>3:45</span>
        </div>

        <div className="flex items-center justify-center space-x-5 mb-5">
          <button
            onClick={playPreviousTrack}
            className="text-gray-500 hover:text-blue-500"
          >
            ⏮️
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>
          <button
            onClick={playNextTrack}
            className="text-gray-500 hover:text-blue-500"
          >
            ⏭️
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Recently Played
          </h3>
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => handleTrackSelect(track)}
              className={`flex items-center p-2 mb-2 rounded-md cursor-pointer ${
                selectedTrack?.id === track.id
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="w-8 h-8 bg-blue-300 rounded-md mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">{track.name}</p>
                <p className="text-xs text-gray-500">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
