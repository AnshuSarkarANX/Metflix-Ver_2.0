import {useState} from "react";
import { useLocation } from "react-router-dom";
import YoutubePlayer from "./YoutubePlayer";
import "./trailerScreen.css"
function TrailerScreen() {
   const location = useLocation();
   const {movie,video} = location.state;
   const [showFullDescription, setShowFullDescription] = useState(false);
   function truncate(str, n) {
     return  str.substr(0, n) ;
   }
   const toggleDescription = () => {
     setShowFullDescription(!showFullDescription);
   };
    return (
      <div className="trScreen">
        <div className="player">
          <YoutubePlayer videoId={video.id.videoId} />
        </div>
        <div className="Blocker">
          <div className="About">
            <h1>{movie.original_name || movie.original_title}</h1>
            <p className="details">
              {truncate(movie.release_date || movie.first_air_date, 4)}
              <span> Rated - {movie.adult ? "A" : "U/A"}</span>
            </p>
            <p className="description">
              {showFullDescription
                ? movie.overview
                : truncate(movie.overview, 150)}
              {movie.overview.length > 150 && (
                <button className="SEE" onClick={toggleDescription}>
                  {showFullDescription ? "See less" : "..... See more."}
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    );
}
export default TrailerScreen;