import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
// import Paginator from "./common/pagination";
import Pagination from "./common/pagination2";
import { paginate } from "../utils/paginate";

// const ITEMS_ON_PAGE = 5;

class Movies extends Component {
  state = {
    movies: getMovies(),
    // moviesOnPage: [],
    pageSize: 4,
    currentPage: 1
  };

  handleDeleteMovie = movie => {
    let { movies } = this.state;
    movies = movies.filter(film => film._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.findIndex(mov => movie._id === mov._id);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = moviesOnPage => {
    this.setState({ moviesOnPage });
  };

  handlePageChange2 = page => {
    this.setState({ currentPage: page });
  };

  renderMoviesRows() {
    const { pageSize, currentPage, movies } = this.state;
    const moviesPage = paginate(movies, currentPage, pageSize);

    return moviesPage.map((movie, index) => (
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
            onClick={() => this.handleDeleteMovie(movie)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  render() {
    const { length: MovieCount } = this.state.movies;
    const { pageSize, currentPage } = this.state;

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
        {/* <Paginator
          itemsList={this.state.movies}
          itemsOnPage={ITEMS_ON_PAGE}
          onPageChange={items => this.handlePageChange(items)}
        /> */}
        <Pagination
          itemsCount={MovieCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange2}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
