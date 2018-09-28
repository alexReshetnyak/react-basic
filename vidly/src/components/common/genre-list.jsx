import React from "react";
import { getGenres } from "../../services/fakeGenreService";
import PropTypes from "prop-types";

const GenreList = ({
  textProperty,
  valueProperty,
  onGenreChange,
  currentGenreId
}) => {
  const genres = [{ _id: "all", name: "All genres" }, ...getGenres()];

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
};

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
