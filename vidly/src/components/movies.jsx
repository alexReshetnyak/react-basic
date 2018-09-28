import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
// import Paginator from "./common/pagination";
import Pagination from "./common/pagination2";
import GenreList from "./common/genre-list";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import { filterMovies } from "../utils/genre-utility";
import _ from "lodash";

// const ITEMS_ON_PAGE = 5;

class Movies extends Component {
  state = {
    movies: [],
    // moviesOnPage: [],
    pageSize: 4,
    currentPage: 1,
    currentGenreId: "all",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    this.setState({ movies: getMovies() });
  }

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

  handleGenreChange = genreId => {
    this.setState({ currentGenreId: genreId, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  renderMoviesRows(genreMovies) {
    return;
  }

  getPageData = () => {
    const {
      movies,
      currentGenreId,
      sortColumn,
      currentPage,
      pageSize
    } = this.state;

    const filteredMovies = filterMovies(currentGenreId, movies);
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const moviesPage = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: moviesPage };
  };

  render() {
    const { pageSize, currentPage, currentGenreId, sortColumn } = this.state;

    const { totalCount, data } = this.getPageData();

    if (!totalCount) {
      return <h2>There are no movies in the database.</h2>;
    }

    return (
      <div className="row">
        <div className="col-3">
          <GenreList
            currentGenreId={currentGenreId}
            onGenreChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <h2>Showing {totalCount} movies in the database</h2>
          <MoviesTable
            movies={data}
            sortColumn={sortColumn}
            onMovieLike={this.handleLike}
            onDeleteMovie={this.handleDeleteMovie}
            onSort={this.handleSort}
          />
          {/* <Paginator
            itemsList={this.state.movies}
            itemsOnPage={ITEMS_ON_PAGE}
            onPageChange={items => this.handlePageChange(items)}
          /> */}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange2}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
