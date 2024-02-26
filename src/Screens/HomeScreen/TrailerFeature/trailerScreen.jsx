import { useLocation } from "react-router-dom";
import YoutubePlayer from "./YoutubePlayer";
import "./trailerScreen.css"
function TrailerScreen() {
   const location = useLocation();
   const {movie,video} = location.state;
   console.log(movie);
   console.log(video);
    return (
      <div className="trScreen">
        <div className="player">
          <YoutubePlayer videoId={video.id.videoId} />
        </div>
        <div className="About">
          <h1>{movie.original_name || movie.original_title}</h1>
          <p className="details">
            {movie.release_date || movie.first_air_date}
            <span> {movie.adult?A:null}</span>
          </p>
          <p className="description">{movie.overview}</p>
        </div>
      </div>
    );
}
export default TrailerScreen;