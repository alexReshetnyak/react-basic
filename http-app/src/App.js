import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
import { ToastContainer } from "react-toastify";
import http from "./services/httpService";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import config from "./config.json";

class App extends Component {
  state = {
    posts: [],
    error: null
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);
  }

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async post => {
    post.title = "UPDATED";
    await http.put(`${config.apiEndpoint}/${post.id}`, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async post => {
    // * Optimistic way
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(`asdas${config.apiEndpoint}/${post.id}`);
    } catch (error) {
      // * Handle expected Errors
      if (error.response && error.response.status === 404) {
        alert("This post already deleted");
      }

      this.setState({ posts: originalPosts });
    }
  };

  handleError = () => {
    throw new Error("start error");
  };

  render() {
    if (this.state.error) {
      //render fallback UI
      return <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>;
    } else {
      return (
        <React.Fragment>
          <ToastContainer />
          <button className="btn btn-primary" onClick={this.handleAdd}>
            Add
          </button>{" "}
          <br /> <br />
          <button className="btn btn-primary" onClick={this.handleError}>
            Create Error
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => this.handleUpdate(post)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(post)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      );
    }
  }
}

export default App;
