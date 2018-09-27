import React, { Component } from "react";

class Paginator extends Component {
  state = {
    currentPage: 1,
    numberOfPages: 1
  };

  componentDidMount() {
    this.calculateItemsOnPage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.itemsList.length !== this.props.itemsList.length) {
      this.calculateItemsOnPage();
    }
  }

  calculateItemsOnPage() {
    let { currentPage } = this.state;
    let from = (currentPage - 1) * this.props.itemsOnPage;
    from >= this.props.itemsList.length &&
      (from = (--currentPage - 1) * this.props.itemsOnPage);
    const to = currentPage * this.props.itemsOnPage;

    const page = this.props.itemsList.slice(from, to);

    const numberOfPages = Math.ceil(
      this.props.itemsList.length / this.props.itemsOnPage
    );

    this.props.onPageChange(page);
    this.setState({ numberOfPages, currentPage });
  }

  handleClick = currentPage => {
    this.setState({ currentPage }, () => this.calculateItemsOnPage());
  };

  renderPaginationButtons() {
    return new Array(this.state.numberOfPages).fill(null).map((val, index) => {
      return (
        <li
          className={
            "page-item" +
            (index + 1 === this.state.currentPage ? " active" : "")
          }
          key={index}
          onClick={() => this.handleClick(index + 1)}
        >
          <a className="page-link">{index + 1}</a>
        </li>
      );
    });
  }

  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {this.renderPaginationButtons()}
        </ul>
      </nav>
    );
  }
}

export default Paginator;
