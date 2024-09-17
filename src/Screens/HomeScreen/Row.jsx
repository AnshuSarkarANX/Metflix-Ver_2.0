import  { useState, useEffect } from "react";
import Axios from "../../axios";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { ytKey1,ytKey2,ytKey3 } from "../../request";
import "./Row.css"; 
import YoutubePlayer from "./TrailerFeature/YoutubePlayer";
import LoadingScreen from "../LoginScreen/LoadingScreen.jsx";
const img_url = "https://image.tmdb.org/t/p/w300";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [video,setVideo] = useState(null);
  const[loading,setLoading] = useState(true)
  let mouseOverTimeout;
  const Navigate = useNavigate();
  useEffect(() => {
    (async function fetchData() {
      const request = await Axios.get(fetchUrl);
      setMovies(request.data.results); 
    })()
  }, [fetchUrl]);
  async function trailer(query) { 
    const apiKeys = [ytKey3, ytKey2, ytKey1];
  for (const key of apiKeys) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${query}+netflix+official+trailer&part=snippet&type=video&maxResults=1&key=${key}`
      );

      if (response.data.items[0]) {
        return response.data.items[0];
      }
    } catch (error) {
      console.error(`Error fetching trailer data with key:`, error.message);
    }
  }
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
    },800)
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
      <div className="PopUpPlayer">
        {video && <YoutubePlayer videoId={video.id.videoId} />}
      </div>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onMouseOver={isMobileDevice() ? null : () => handleMouseOver(movie)}
            onMouseOut={handleMouseOut}
            onClick={isMobileDevice() ? () => handleTouchStart(movie) : null}
            className={`row_image ${isLargeRow && "row_imageLarge"}`}
            src={`${img_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.original_title}
            draggable="false"
          />
      )
      
        )}
      </div>
    </div>
  );
}

export default Row;
