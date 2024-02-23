import  { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css"; 
const img_url = "https://image.tmdb.org/t/p/w300";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results); 
    })()
  }, [fetchUrl]);
  return (
    <div className="row">
      <h2 className="RowTitle">{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            onMouseOver={() =>
              console.log(`${movie.original_name || movie.original_title}`)
            }
            key={movie.id}
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
