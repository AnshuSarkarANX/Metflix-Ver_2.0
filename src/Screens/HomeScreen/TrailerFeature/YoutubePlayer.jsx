import React from "react";
import YouTube from "react-youtube";
const YoutubePlayer = ({videoId}) => {
  // YOUTUBE VIDEO FUNCTION
  const opts = {
    width: "100%",
    borderRadius: "2rem",
    playerVars: { 
      autoplay:1,
      controls:0
  },
  };
  const videoReady = (event) => {
    event.target.playVideo();
  };
  return (
    <>
        <div
          style={{
            margin: "auto",
            marginTop: "12px",
            overflow: "hidden",
          }}
        >
          <YouTube videoId={videoId} opts={opts} onReady={videoReady} />
        </div>
    </>
  );
};

export default YoutubePlayer;
