import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";
import strayCatSpace from "@/assets/audio/野良猫は宇宙を目指した.mp3";
import twoTwentyThreeAm from "@/assets/audio/2_23_AM.mp3";
import tenDegrees from "@/assets/audio/10℃.mp3";
import pastelHouse from "@/assets/audio/パステルハウス.mp3";
import kamikakushi from "@/assets/audio/神隠しの真相.mp3";

export interface Track {
  id: number;
  name: string;
  artist: string;
  src: string;
}

interface AudioContextType {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  selectTrack: (track: Track) => void;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const tracks: Track[] = [
  {
    id: 1,
    name: "野良猫は宇宙を目指した",
    artist: "しゃろう",
    src: strayCatSpace,
  },
  {
    id: 2,
    name: "2_23_AM",
    artist: "しゃろう",
    src: twoTwentyThreeAm,
  },
  {
    id: 3,
    name: "10℃",
    artist: "しゃろう",
    src: tenDegrees,
  },
  {
    id: 4,
    name: "パステルハウス",
    artist: "かずち",
    src: pastelHouse,
  },
  {
    id: 5,
    name: "神隠しの真相",
    artist: "しゃろう",
    src: kamikakushi,
  },
];

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const selectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const currentIndex = tracks.findIndex((track) => track.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    const currentIndex = tracks.findIndex((track) => track.id === currentTrack?.id);
    const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[previousIndex]);
    setIsPlaying(true);
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        tracks,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        selectTrack,
        play,
        pause,
        togglePlayPause,
        playNext,
        playPrevious,
        seek,
        setVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};