import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const domain = "http://localhost:3100";

class App extends Component {
  state = {
    title: ""
  };

  render() {
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();

            axios
              .post(`${domain}/create`, {
                title: this.state.title
              })
              .then(response => {
                if (response.status === 200) {
                  console.log("response", response.data);
                } else {
                  console.error("An error occurred");
                }
              })
              .catch(err => {
                console.error(err);
              });
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={this.state.title}
            onChange={event => {
              this.setState({ title: event.target.value });
            }}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
