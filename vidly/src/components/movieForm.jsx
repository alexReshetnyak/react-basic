import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import genreService from "../services/genreService";
import moviesService from "../services/movieService";

class Movie extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: []
  };

  schema = {
    title: Joi.string()
      .required()
      .min(5)
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

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  async populateGenres() {
    const { data: genres } = await genreService.getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const { id } = this.props.match.params;
      if (!id) return;

      const { data: movie } = await moviesService.getMovie(id);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  mapToViewModel(movie) {
    movie.genreId = movie.genre._id;
    delete movie.genre;
    return movie;
  }

  doSubmit = async () => {
    await moviesService.saveMovie(this.state.data);
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
