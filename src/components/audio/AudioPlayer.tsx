import React from "react";
import { useAudio } from "@/contexts/AudioContext";
import { SkipBack, SkipForward, Play, Pause, X, Music } from "@geist-ui/icons";

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
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center mb-4">
          <div className="w-32 h-32 rounded-md mb-3 shadow-lg overflow-hidden">
            {currentTrack?.albumArt ? (
              <img
                src={currentTrack.albumArt}
                alt={currentTrack.name}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                width={128}
                height={128}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <Music size={48} className="text-white" />
              </div>
            )}
          </div>
          <p className="text-lg font-medium">{currentTrack?.name}</p>
          <p className="text-sm text-gray-500">{currentTrack?.artist}</p>
        </div>

        <div
          className="w-full bg-gray-200 h-1 rounded-full my-3 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all"
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
            className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <SkipBack size={24} />
          </button>
          <button
            onClick={togglePlayPause}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={playNext}
            className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <SkipForward size={24} />
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
              <div className="w-8 h-8 rounded-md mr-3 overflow-hidden">
                {track.albumArt ? (
                  <img
                    src={track.albumArt}
                    alt={track.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={32}
                    height={32}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-300 to-purple-400 flex items-center justify-center">
                    <Music size={12} className="text-white" />
                  </div>
                )}
              </div>
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