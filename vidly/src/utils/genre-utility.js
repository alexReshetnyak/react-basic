export function filterMovies(currentGenreId, movies, searchValue) {
  if (currentGenreId === "all") return movies;

  return movies.filter(movie => {
    if (searchValue.trim()) {
      return movie.title
        .trim()
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase());
    }
    return currentGenreId === movie.genre._id;
  });
}
