import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const domain = "http://localhost:3100";

class App extends Component {
  state = {
    title: "",
    tasks: []
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.tasks.map(task => (
            <li key={task._id}>{task.title}</li>
          ))}
        </ul>
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

  componentDidMount() {
    axios
      .get(`${domain}/`)
      .then(response => {
        if (response.status === 200) {
          this.setState({ tasks: response.data });
        } else {
          console.error("An error occurred");
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export default App;
