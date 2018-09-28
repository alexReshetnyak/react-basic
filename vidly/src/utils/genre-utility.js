export function filterMovies(currentGenreId, movies) {
  if (currentGenreId === "all") {
    return movies;
  }

  return movies.filter(movie => currentGenreId === movie.genre._id);
}
