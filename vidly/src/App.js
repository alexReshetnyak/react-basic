import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Movies from "./components/movies";
import Movie from "./components/movieForm";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NotFound from "./components/notFound";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <br />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies/new" component={Movie} />
            <Route path="/movies/:id" component={Movie} />
            <Route
              path="/movies"
              render={props => (
                <Movies
                  {...props}
                  sortColumn={{ path: "dailyRentalRate", order: "desc" }}
                />
              )}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Redirect from="/home" to="/movies" />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
