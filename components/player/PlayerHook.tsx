import { useState, useEffect, useRef } from "react";
import { Song } from "../../interfaces/song";
import { useQuery } from "react-query";

const usePlayer = () => {
  const [volume, setVolume] = useState<number>(50);
  const [playing, setPlaying] = useState<boolean>(false);
  const [musicPlayers] = useState<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio("") : undefined
  );
  /*let musicPlayers: HTMLAudioElement | undefined =
    typeof Audio !== "undefined" ? new Audio("") : undefined;
  /*const [current_song, setCurrent_song] = useState<Song>({
    id: 0,
    titre: "",
    artiste: "",
    youtube: "",
    apple_music: "",
    photo: "",
    voted: false,
    votes: 0,
  });*/
  const fetch_current_song2 = async () => {
    //setTimeout(async function () {
    const info = await fetch("http://localhost:3000/api/song");
    //  const playing = await info.json();
    // setCurrent_song(playing);
    //  setloading(false);
    return info.json();
    //  }, 2000);
  };
  const { isLoading, isError, data, error, refetch } = useQuery<Song>(
    "current_song",
    fetch_current_song2,
    { refetchInterval: 30000, refetchIntervalInBackground: true }
  );
  useEffect(() => {
    if (musicPlayers && musicPlayers) {
      musicPlayers.volume = volume / 100;
    }
  }, [volume]);
  useEffect(() => {
    if (!playing && musicPlayers !== undefined) {
      musicPlayers.src = "";
      musicPlayers.pause();
    } else {
      if (musicPlayers !== undefined) {
        musicPlayers.src = "https://stream1.dgnet.be/1";
        musicPlayers.play();
      }
    }
  }, [playing]);

  //function to fetch current song information
  // const fetch_current_song = async () => {
  //   setTimeout(async function () {
  //     try {
  //       const info = await fetch("http://localhost:3000/api/song");
  //       const playing = await info.json();
  //       setCurrent_song(playing);
  //       setloading(false);
  //     } catch {
  //       //  alert("ser");
  //     }
  //   }, 10000);
  // };

  // useEffect(() => {
  //   // const fetch_current = async () => {
  //   //   try {
  //   //     const info = await fetch("http://localhost:3000/api/song");
  //   //     const playing = await info.json();
  //   //     setCurrent_song(playing);
  //   //     setloading(false);
  //   //   } catch {
  //   //     alert("ser");
  //   //   }
  //   // };
  //   // fetch_current();
  //   setloading(true);
  //   //  fetch_current_song();

  //   console.log(isLoading);
  //   console.log(isError);
  //   console.log(data);
  //   console.log(error);
  // }, []);
  // useEffect(() => {
  //   console.log(isLoading);
  //   console.log(isError);
  //   console.log(data);
  //   console.log(error);
  // }, [isLoading]);
  // {
  //   console.log(data);
  // }
  // useEffect(() => {
  //   const interval = setInterval(() => fetch_current_song(), 30000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  return {
    playing,
    // loading,
    volume,
    setPlaying,
    setVolume,
    refetch,
    isLoading,
    isError,
    data,
    error,
  };
};
export default usePlayer;
