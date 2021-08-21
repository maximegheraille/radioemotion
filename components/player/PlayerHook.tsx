import { useState, useRef, useEffect } from "react";
import { Song } from "../../interfaces/song";
import { useQuery } from "react-query";

const usePlayer = () => {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  //const [isLoading, setisLoading] = useState<boolean>(true);
  const fetch_current_song = async () => {
    const info = await fetch("/api/song/current_song");
    return info.json();
  };

  setTimeout(function () {
    // setisLoading(false);
  }, 2000);
  const { isLoading, data, isError, error, status, refetch } = useQuery<Song>(
    "current_song",
    fetch_current_song,
    //{ refetchOnWindowFocus: false, retryOnMount: false }
    {
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: false,
    }
  );

  // const data: Song = {
  //   id: 1,
  //   artiste: "C'est presque samedi",
  //   titre: "Olivier",
  //   photo: "https://www.radioemotion.be/covers/emo5.jpg",
  // };

  // const data: Song = {
  //   id: 1339,
  //   youtube: "s://www.",
  //   apple_music:
  //     "https://geo.itunes.apple.com/be/album/feel-so-high/id303848555?i=303848752&mt=1&app=music",
  //   photo: "https://www.radioemotion.be/covers/1339.jpg",
  //   artiste: "Des'ree",
  //   titre: "Feel so high",
  //   votes: 200,
  //   voted: false,
  // };
  useEffect(() => {
    //console.log(status, isLoading, isError, data, error);
  }, [isLoading, isError, data, status, error]);
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
