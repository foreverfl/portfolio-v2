import React from "react";
import { useAudio } from "@/contexts/AudioContext";

const AudioPlayer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    tracks,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    playNext,
    playPrevious,
    selectTrack,
    seek,
  } = useAudio();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seek(percentage * duration);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

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
          <p className="text-lg font-medium">{currentTrack?.name}</p>
          <p className="text-sm text-gray-500">{currentTrack?.artist}</p>
        </div>

        <div
          className="w-full bg-gray-200 h-1 rounded-full my-3 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="bg-blue-500 h-full rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm text-gray-500 mb-3">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        <div className="flex items-center justify-center space-x-5 mb-5">
          <button
            onClick={playPrevious}
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
            onClick={playNext}
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
              onClick={() => selectTrack(track)}
              className={`flex items-center p-2 mb-2 rounded-md cursor-pointer ${
                currentTrack?.id === track.id
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