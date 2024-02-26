import  { useState, useEffect } from "react";
import Axios from "../../axios";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { ytKey1,ytKey2,ytKey3 } from "../../request";
import "./Row.css"; 
import YoutubePlayer from "./TrailerFeature/YoutubePlayer";
const img_url = "https://image.tmdb.org/t/p/w300";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [video,setVideo] = useState(null);
  let mouseOverTimeout;
  const Navigate = useNavigate();
  useEffect(() => {
    (async function fetchData() {
      const request = await Axios.get(fetchUrl);
      setMovies(request.data.results); 
    })()
  }, [fetchUrl]);
  async function trailer(query) { 
    let request = {
      method: "get",
      url: `https://www.googleapis.com/youtube/v3/search?q=${query} netflix official trailer&part=snippet&videoDuration=short&type=video&maxResults=1&key=${ytKey2}`,
    };
    const response = await axios(request);
    return response.data.items[0];
   }
   const isMobileDevice = () =>{
    return /Mobi|Android/i.test(navigator.userAgent);
   }
   const handleMouseOver = async (movie) =>{
    clearTimeout(mouseOverTimeout);
  mouseOverTimeout = setTimeout(async () =>{
         const response = await trailer(
           movie.original_name || movie.original_title
         );
         setVideo(response);
    },1000)
   }
   const handleMouseOut = ()=>{
    clearTimeout(mouseOverTimeout);
    setVideo(null);
   }
   const handleTouchStart = async (movie) => {
            const response = await trailer(
              movie.original_name || movie.original_title
            );
            setVideo(response);
    Navigate("/trailerscreen", { state: { movie,  video:response } });
   } 
  return (
    <div className="row">
      <h2 className="RowTitle">{title}</h2>
      {video &&  (
        <YoutubePlayer videoId={video.id.videoId} />
      )}
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onMouseOver={isMobileDevice() ? null : () => handleMouseOver(movie)}
            onMouseOut={handleMouseOut}
            onTouchStart={isMobileDevice()?() => handleTouchStart(movie):null}
            className={`row_image ${isLargeRow && "row_imageLarge"}`}
            src={`${img_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.original_title}
            draggable="false"
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
