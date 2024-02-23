import { useEffect, useState } from "react";
import Axios from "../../axios";
import axios from "axios";
import requests, { ApiKey } from "../../request";
import "./banner.css";
import Tmdb_logo from "./tmdb_logo.svg";

const img_url = "https://image.tmdb.org/t/p/original/";

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function Banner() {
  const [movie, setMovie] = useState([]);
  const [Genre, setGenre] = useState([]);
  useEffect(() => {
    (async function fetchData() {
      const request = await Axios.get(requests.NetflixOriginals);
      setMovie(  
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );
    })();
  }, []);
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

  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("${img_url}${movie.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="BannerComponents">
          <h1 className="BannerTitle">
            {movie.title || movie.name || movie.original_name}
          </h1>
          <div>
            <button className="ButtonBanner">Play</button>
            <button className="ButtonBanner">Add to watch list</button>
            <p className="BannerDescription">{truncate(movie.overview, 150)}</p>
            <div className="genreSection">
              {Genre.map((genre) => (
                <ul className="genre" key={genre.id}>
                  {genre.name}
                </ul>
              ))}
            </div>
          </div>
        </div>
        <img className="tmdb_logo" src={Tmdb_logo} alt="tmdb_logo" />
        <div className="fade_bottom" />
      </header>
    </>
  );
}

export default Banner;
