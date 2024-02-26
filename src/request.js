const API_KEY = "d05f0d9230141b9170188da04170c454";
const YT_API_1 = "AIzaSyCE1AIvt1qVZFOqMU1OpNLcEnlAk5p5b4s";
const YT_API_2 = "AIzaSyBZX_i21SghjV9TQOprVmL6-sIwP7eHHHk";
const YT_API_3 = "AIzaSyALDAqo97awQSRowZ0_qi-AysRotbHuhXw";
const fb_API_KEY = "AIzaSyCx6bJSvNAz1qmdXNABtjb9zqS7UeKkufo";
const requests = {
  Trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  NetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  TopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  ActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  ComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  HorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  RomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  Documantaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};
export default requests;
export const ApiKey = API_KEY;
export const ytKey1 = YT_API_1;
export const ytKey2 = YT_API_2;
export const ytKey3 = YT_API_3;
export const FirebaseAPI = fb_API_KEY;