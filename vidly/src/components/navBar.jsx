import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    const { user } = this.props;
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
            {!user && (
              <React.Fragment>
                <NavLink to="/login" className="nav-item clickable nav-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-item clickable nav-link">
                  Register
                </NavLink>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <NavLink to="/profile" className="nav-item clickable nav-link">
                  {user.name}
                </NavLink>
                <NavLink to="/logout" className="nav-item clickable nav-link">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
