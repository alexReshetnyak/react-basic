import React, { Component } from "react";
import { Link } from "react-router-dom";

class Products extends Component {
  state = {};
  render() {
    return (
      <ul>
        <li>
          <Link to="/products/1">Product 1</Link>
        </li>
        <li>
          <Link to="/products/2">Product 2</Link>
        </li>
        <li>
          <Link to="/products/3">Product 3</Link>
        </li>
        <li>
          <Link to="/products/4">Product 4</Link>
        </li>
      </ul>
    );
  }
}

export default Products;
