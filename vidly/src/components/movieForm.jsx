import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class Movie extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    movieId: "",
    genres: []
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string().label("Genre"),
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
    console.log("Props:", this.props);
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
          {/* {this.renderInput("genreId", "Genre")} */}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default Movie;
