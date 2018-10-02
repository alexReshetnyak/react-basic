import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to="/" className="navbar-brand clickable">
          Vidly
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavLink to="/movies" className="nav-item clickable nav-link">
              Movies
            </NavLink>
            <NavLink to="/customers" className="nav-item clickable nav-link">
              Customers
            </NavLink>
            <NavLink to="/rentals" className="nav-item clickable nav-link">
              Rentals
            </NavLink>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
