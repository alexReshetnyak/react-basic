import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDeleteMovie = movieIndex => {
    const { movies } = this.state;
    movies.splice(movieIndex, 1);
    this.setState({ movies });
  };
  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.findIndex(mov => movie._id === mov._id);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  renderMoviesRows() {
    return this.state.movies.map((movie, index) => (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <Like like={movie.liked} onLike={() => this.handleLike(movie)} />
        </td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => this.handleDeleteMovie(index)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    const { length: MovieCount } = this.state.movies;

    if (!MovieCount) {
      return <h2>There are no movies in the database.</h2>;
    }

    return (
      <React.Fragment>
        <h2>Showing {MovieCount} movies in the database</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col" />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{this.renderMoviesRows()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
