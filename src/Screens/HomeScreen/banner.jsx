import { useEffect, useState,useRef } from "react";
import Axios from "../../axios";
import axios from "axios";
import requests from "../../request";
import "./banner.css";
import Tmdb_logo from "./tmdb_logo.svg";
import { ytKey1,ytKey2,ytKey3 } from "../../request";
import { useNavigate } from "react-router-dom";

const img_url = "https://image.tmdb.org/t/p/original/";

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function Banner() {
  const [movie, setMovie] = useState([]);
  const [Genre, setGenre] = useState([]);
  const [loading,setLoading] = useState(true);
  const Navigate = useNavigate();
  const canvasref = useRef();
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
     const handleClick = async (movie) => {
       const response = await trailer(
         movie.original_name || movie.original_title
       );
       Navigate("/trailerscreen", { state: { movie, video:response } });
     }; 
  useEffect(() => {
    (async function fetchData() {
      const request = await Axios.get(requests.NetflixOriginals);
      setMovie(  
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );
        setLoading(false);
    })();
  }, [setLoading]);
  useEffect(() => {
    (async function genre() {
      const genre = {
        method: "GET",
        url: "https://api.themoviedb.org/3/tv/" + movie.id,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDVmMGQ5MjMwMTQxYjkxNzAxODhkYTA0MTcwYzQ1NCIsInN1YiI6IjYzYTIwODVjY2U5OTdhMDBhMDQ5YWJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PH0rVaaYoZQya41buZw1ccpu3omSZj3ghk_fAJBCVxE",
        },
      };
      const reque = await axios(genre);
      return setGenre(reque.data.genres);
      
    })();
  }, [movie]);
useEffect(() => {
  const canvas = canvasref.current;
  const ctx = canvas.getContext("2d");

  if (movie.poster_path) {
    const img = new Image();
    img.onload = () =>{
      ctx.filter = "blur(1px)";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = `${img_url}${movie.poster_path}`;
  }
}, [movie]);

  return (
    <div className="wraper">
      <canvas
        ref={canvasref}
        className="Hide"
        height="8px"
        width="8px"
      ></canvas>
      <div className="Bwrapper">
        <div
          className="banner"
          style={{
            backgroundSize: "100% 130%",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("${img_url}${
              window.innerWidth > 550 ? movie.backdrop_path : movie.poster_path
            }")`,
            backgroundPosition: "top center",
            backgroundClip: "border-box",
          }}
        >
          <div className="BannerComponents m_Hide">
            <h1 className="BannerTitle ">
              {movie.title || movie.name || movie.original_name}
            </h1>
            <div className="ButtonSection">
              <button
                className="ButtonBanner play"
                onTouchEnd={() => handleClick(movie)}
              >
                <svg
                  height="24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Play
              </button>
              <button className="ButtonBanner">
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.3"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" x2="12" y1="5" y2="19" />
                  <line x1="5" x2="19" y1="12" y2="12" />
                </svg>
                My list
              </button>
            </div>
            <p className="BannerDescription">{truncate(movie.overview, 150)}</p>
          </div>
          <img className="tmdb_logo" src={Tmdb_logo} alt="tmdb_logo" />
          <div className="mobile_ButtonGenre Hide">
            <ul className="genreSection">
              {Genre.map((genre) => (
                <li className="genre" key={genre.id}>
                  {genre.name}
                </li>
              ))}
            </ul>
            <div className="ButtonSection">
              <button
                className="ButtonBanner play"
                onTouchEnd={() => handleClick(movie)}
              >
                  <svg
                    height="15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 20 20"
                    width="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Play
              </button>
              <button className="ButtonBanner">
                <svg
                  fill="none"
                  height="15"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 20 20"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" x2="12" y1="5" y2="19" />
                  <line x1="5" x2="19" y1="12" y2="12" />
                </svg>
                My List
              </button>
            </div>
          </div>
        </div>
        <div className="fade_bottom m_Hide" />
      </div>
    </div>
  );
}

export default Banner;