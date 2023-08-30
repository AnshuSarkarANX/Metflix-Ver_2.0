import React, { useEffect, useState } from "react";
import axios from "../../axios";
import requests from "../../request";
import "./banner.css";
import Tmdb_logo from "./tmdb_logo.svg";

const img_url = "https://image.tmdb.org/t/p/original/";

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.NetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * (request.data.results.length - 1))
        ]
      );
      return request;
    }
    fetchData();
  }, []);

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
          </div>
        </div>
        <img className="tmdb_logo" src={Tmdb_logo} alt="tmdb_logo" /> 
        <div className="fade_bottom" />
      </header>
    </>
  );
}

export default Banner;
