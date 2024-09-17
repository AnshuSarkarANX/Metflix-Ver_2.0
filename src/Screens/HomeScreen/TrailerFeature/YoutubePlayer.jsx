import React from "react";
import YouTube from "react-youtube";
const YoutubePlayer = ({videoId}) => {
  // YOUTUBE VIDEO FUNCTION
  const opts = {
    width: "100%",
    height: "350px",
    borderRadius: "2rem",
    playerVars: {
      autoplay: 1,
      controls: 0,
      enablejsapi:1
    }
  };
  const videoEnd = (event) =>{
    event.target.stopVideo(-1);
  }
  return (
    <>
      <div
        className="Player"
        style={{
          margin: "-6.5vh -1vw -7vh",
          overflow: "hidden",
          
        }}
      >
        <YouTube videoId={videoId} opts={opts} onEnd={videoEnd}/>
      </div>
    </>
  );
};

export default YoutubePlayer;
