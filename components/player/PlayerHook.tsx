import { useState, useRef, useEffect } from "react";
import { Song } from "../../interfaces/song";
import { useQuery } from "react-query";

const usePlayer = () => {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const fetch_current_song = async () => {
    const info = await fetch("/api/song");
    return info.json();
  };

  setTimeout(function () {
    setisLoading(false);
  }, 2000);
  const { /* isLoading,*/ isError, data, error, refetch } = useQuery<Song>(
    "current_song",
    fetch_current_song,
    { refetchInterval: 30000, refetchIntervalInBackground: true }
  );
  return {
    playing,
    isLoading,
    isError,
    data,
    error,
    setPlaying,
    refetch,
    playerRef,
  };
};
export default usePlayer;
