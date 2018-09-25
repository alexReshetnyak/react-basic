import React, { Component } from "react";

class Counter extends Component {
  render() {
    // * this.props.children - Html code passed to this component
    const {
      children,
      counter,
      onDecrement,
      onIncrement,
      onDelete
    } = this.props;
    return (
      <React.Fragment>
        <div className="row no-gutters">{children}</div>
        <div className="row">
          <div className="col-1">
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          </div>
          <div className="col">
            <button
              onClick={() => onIncrement(counter)}
              className="btn btn-secondary"
            >
              +
            </button>
            <button
              onClick={() => onDecrement(counter)}
              className="btn btn-secondary m-2"
              disabled={!counter.value ? "disabled" : ""}
            >
              -
            </button>
            <button
              onClick={() => onDelete(counter.id)}
              className="btn btn-danger"
            >
              x
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += !this.props.counter.value ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
}

export default Counter;
