import http from "./httpService";
// import config from "../config.json";

function movieUrl(id) {
  return `movies/${id}`;
}

function getMovies() {
  // return http.get('http://localhost:3900/api/movies');
  return http.get(`movies`);
}

function getMovie(id) {
  return http.get(movieUrl(id));
}

function saveMovie(movie) {
  const {
    _id,
    ...body
  } = movie;
  if (_id) {
    return http.put(movieUrl(_id), body);
  }
  return http.post(`movies`, body);
}

function deleteMovie(id) {
  return http.delete(movieUrl(id));
}

export default {
  getMovies,
  getMovie,
  saveMovie,
  deleteMovie
};