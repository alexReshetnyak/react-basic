import React, { Component } from "react";
import genreService from "../../services/genreService";
import PropTypes from "prop-types";

class GenreList extends Component {
  state = { genres: [] };

  async componentDidMount() {
    const { data: dbGenres } = await genreService.getGenres();
    const genres = [{ _id: "all", name: "All genres" }, ...dbGenres];
    this.setState({ genres });
  }

  render() {
    const { genres } = this.state;
    const {
      textProperty,
      valueProperty,
      onGenreChange,
      currentGenreId
    } = this.props;

    return (
      <ul className="list-group">
        {genres.map(genre => (
          <li
            className={
              currentGenreId === genre[valueProperty]
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onGenreChange(genre[valueProperty])}
            key={genre[valueProperty]}
          >
            {genre[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

GenreList.defaultProps = {
  // *Set default properties
  textProperty: "name",
  valueProperty: "_id"
};

GenreList.propTypes = {
  // * Types checking with props types in React docs
  currentGenreId: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string
};

export default GenreList;
