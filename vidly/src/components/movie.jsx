import React from "react";

const Movie = ({ match, history }) => {
  // console.log("THIS:", this);

  return (
    <div>
      <h1>Movie Form {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")} // * history.push("/movies") - program navigation
      >
        Save
      </button>
    </div>
  );
};

export default Movie;
