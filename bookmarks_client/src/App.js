import React, { Component } from "react";
import NewForm from "./components/NewForm.js";

const baseURL = "http://localhost:3003";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
    };

    this.getBookmarks = this.getBookmarks.bind(this);
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
  }

  componentDidMount() {
    this.getBookmarks();
  }

  handleAddBookmark(bookmark) {
    this.setState({
      bookmarks: this.state.bookmarks.concat(bookmark),
    });
  }

  getBookmarks() {
    fetch(baseURL + "/bookmarks")
      .then((data) => {
        return data.json();
      })
      .then((parsedData) => {
        this.setState({
          bookmarks: parsedData,
        });
      });
  }

  render() {
    return (
      <div>
        <h1>bookmarks!</h1>
        <NewForm handleAddBookmark={this.handleAddBookmark} />
        <table>
          <tbody>
            {this.state.bookmarks.map((bookmark) => {
              return (
                <tr>
                  <td key={bookmark._id}> {bookmark.name} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
