import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Counters from "./components/counters";
import Navbar from "./components/navbar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  constructor() {
    // * First Life Cycle
    super();
    console.log("App - Constructor");
  }

  componentDidMount() {
    //* Third Life Cycle
    console.log("App - Mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    //* Start after render life cycle, used to get access to previous state and props
    console.log("Component - did update", prevState, prevProps);

    if (prevState.counters[0].value !== this.state.counters[0].value) {
      // * For example you can make some ajax request for a new data
    }
  }

  componentWillUnmount() {
    // * Start when delete component
    console.log("Component - will unmount");
  }

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(counter => {
      counter.value = 0;
      return counter;
    });

    this.setState({ counters });
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter }; // * React: Do not mutate state directly
    counters[index].value++;

    this.setState({ counters });
  };

  handleDecrement = counter => {
    if (!counter.value) {
      return;
    }

    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter }; // * React: Do not mutate state directly
    counters[index].value--;

    this.setState({ counters });
  };

  render() {
    console.log("App - Rendered"); //* Second Life Cycle

    return (
      <React.Fragment>
        <Navbar
          totalCounters={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container">
          <Counters
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
            counters={this.state.counters}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
