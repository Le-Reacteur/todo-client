import React, { Component } from "react";
import axios from "axios";
import "./css/App.css";
import "./css/milligram.min.css";

const domain = "http://localhost:3100";

class App extends Component {
  state = {
    title: "",
    tasks: []
  };

  refreshTasks() {
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

  componentDidMount() {
    this.refreshTasks();
  }

  render() {
    return (
      <div className="container">
        <h1>To-Do list</h1>
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
                  this.setState({ title: "" }, () => {
                    this.refreshTasks();
                  });
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
          <input type="submit" value="Ajouter une tâche" />
        </form>
      </div>
    );
  }
}

export default App;
