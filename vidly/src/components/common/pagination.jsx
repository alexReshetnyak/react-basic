import React, { Component } from "react";

class Paginator extends Component {
  state = { currentPage: 1 };
  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link">1</a>
          </li>
          <li className="page-item">
            <a className="page-link">2</a>
          </li>
          <li className="page-item">
            <a className="page-link">3</a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Paginator;
