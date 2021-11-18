import { useState, useRef } from "react";
import { Song } from "../../interfaces/song";
import { useQuery } from "react-query";

const usePlayer = () => {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  const fetch_current_song = async () => {
    const info = await fetch("/api/song/current_song");
    return info.json();
  };

  const { isLoading, data, isError, error, refetch } = useQuery<Song>(
    "current_song",
    fetch_current_song,
    {
      refetchInterval: 10000,
      refetchIntervalInBackground: true,
      refetchOnReconnect: "always",
    }
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
