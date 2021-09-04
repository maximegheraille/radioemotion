import React from "react";
import LazyLoad from "react-lazyload";
import Banniere from "../components/shared/banniere/Banniere";
import playlistban from "../public/images/bannieres/playlist.jpg";
import Playlist from "../components/playlist/Playlist";
const playlist = () => {
  return (
    <>
      <div>
        <LazyLoad>
          <Banniere image={playlistban} />
        </LazyLoad>
        <LazyLoad>
          <Playlist />
        </LazyLoad>
      </div>
    </>
  );
};

export default playlist;
