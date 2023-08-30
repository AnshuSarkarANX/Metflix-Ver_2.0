import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css"; 
const img_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);
  return (
    <div className="row">
      <h2 className="RowTitle">{title}</h2>
      <div className="row_posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                key={movie.id}
                className={`row_image ${isLargeRow && "row_imageLarge"}`}
                src={`${img_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.original_title}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
