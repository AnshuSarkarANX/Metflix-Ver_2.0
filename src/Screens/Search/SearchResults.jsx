import axios from "axios";
import "./SearchResults.css"
import { useState } from "react";
import SearchCard from "./SearchCard";

const SearchResults = ({ term, adult }) => {
 const [card, setCard] = useState([])
  const search = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/multi",
    params: {
      query: term,
      include_adult: "true",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDVmMGQ5MjMwMTQxYjkxNzAxODhkYTA0MTcwYzQ1NCIsInN1YiI6IjYzYTIwODVjY2U5OTdhMDBhMDQ5YWJhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PH0rVaaYoZQya41buZw1ccpu3omSZj3ghk_fAJBCVxE",
    },
  };

  axios
    .request(search)
    .then( response => {
      console.log(response.data.results);
      setCard(response.data.results);
    })
    .catch(function (error) {
      console.error(error);
    });
  return <>
  {card.map((c) => {
     <SearchCard
       key={c.id}
       title={c.original_name || c.name}
       type={c.media_type}
       year={c.first_air_date || c.release_date}
       image={c.poster_path}
     />;
  })};
  </>; 
};

export default SearchResults;
