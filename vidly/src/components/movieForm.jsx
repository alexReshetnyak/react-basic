import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService.js";
import { getMovie } from "../services/fakeMovieService.js";

class Movie extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    movieId: "",
    genres: [],
    movie: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Rate")
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const state = { genres: getGenres() };

    id && (state.movie = getMovie(id));

    console.log("Props:", this.props, state);
    this.setState(state);
  }

  doSubmit = () => {
    this.props.history.push("/movies");
    // const username = this.username.current.value;
    // console.log("Submitted", username);
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect(
            "genreId",
            "Genre",
            "_id",
            "name",
            this.state.genres
          )}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default Movie;
