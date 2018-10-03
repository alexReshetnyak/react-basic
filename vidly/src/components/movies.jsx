import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination2";
import GenreList from "./common/genre-list";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import { filterMovies } from "../utils/genre-utility";
import SearchBox from "./common/searchBox";
import _ from "lodash";

// const ITEMS_ON_PAGE = 5;

class Movies extends Component {
  state = {
    movies: [],
    // moviesOnPage: [],
    pageSize: 4,
    currentPage: 1,
    currentGenreId: "all",
    sortColumn: { path: "title", order: "asc" },
    searchQuery: ""
  };

  componentDidMount() {
    const newState = { movies: getMovies() };
    this.props.sortColumn && (newState.sortColumn = this.props.sortColumn);

    this.setState(newState);
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
    this.setState({ currentGenreId: genreId, currentPage: 1, searchQuery: "" });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      currentGenreId: "",
      currentPage: 1
    });
  };

  renderMoviesRows(genreMovies) {
    return;
  }

  getPageData = () => {
    let {
      movies,
      currentGenreId,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery
    } = this.state;

    const filteredMovies = filterMovies(currentGenreId, movies, searchQuery);

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const moviesPage = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: moviesPage };
  };

  render() {
    const {
      pageSize,
      currentPage,
      currentGenreId,
      sortColumn,
      searchQuery
    } = this.state;

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
          <Link
            className="btn btn-primary"
            to="/movies/new"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <h2>Showing {totalCount} movies in the database</h2>
          {/* <Input
            onChange={this.handleSearch}
            name="search"
            value={searchQuery}
            placeholder="Search..."
          /> */}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
