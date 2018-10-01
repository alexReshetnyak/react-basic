import React from "react";
import * as queryString from "query-string";

const Posts = ({ match, location }) => {
  const result = queryString.parse(location.search); // * Module to parse query params
  console.log("Result", result);

  return (
    <div>
      <h1>Posts</h1>
      Year: {match.params.year}, Month: {match.params.month}
    </div>
  );
};

export default Posts;
