import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService.js";
import { getMovie, saveMovie } from "../services/fakeMovieService.js";

class Movie extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: []
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Rate"),
    _id: Joi.string()
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const { id } = this.props.match.params;

    if (!id) return;

    const movie = getMovie(id);
    if (!movie) {
      return this.props.history.replace("/not-found");
    }

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    movie.genreId = movie.genre._id;
    delete movie.genre;
    return movie;
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    // const username = this.username.current.value;
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default Movie;
