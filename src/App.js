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
        <ul className="unstyled">
          {this.state.tasks.map(task => (
            <li key={task._id}>
              <span
                className="with-pointer"
                onClick={() => {
                  axios
                    .post(`${domain}/delete`, { id: task._id })
                    .then(response => {
                      if (response.status === 200) {
                        console.log("response", response.data);
                        this.refreshTasks();
                      } else {
                        console.error("An error occurred");
                      }
                    })
                    .catch(err => {
                      console.error(err);
                    });
                }}
              >
                ✕
              </span>{" "}
              <span
                style={{
                  textDecoration: task.isDone ? "line-through" : "none"
                }}
                className="with-pointer"
                onClick={() => {
                  axios
                    .post(`${domain}/update`, { id: task._id })
                    .then(response => {
                      if (response.status === 200) {
                        console.log("response", response.data);
                        this.refreshTasks();
                      } else {
                        console.error("An error occurred");
                      }
                    })
                    .catch(err => {
                      console.error(err);
                    });
                }}
              >
                {task.title}
              </span>
            </li>
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
            placeholder="Titre"
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
