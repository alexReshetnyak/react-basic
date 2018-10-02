import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import Movies from "./components/movies";
import Movie from "./components/movie";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <br />
        <main className="container">
          <Switch>
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
