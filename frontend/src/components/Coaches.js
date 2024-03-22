import React, { Component } from "react";
import CoachList from "./CoachList";

import { COACHES_ENDPOINT } from "../constants";

class Coaches extends Component {
  state = {
    coaches: []
  };

  componentDidMount() {
    this.resetState();
  }

  getCoaches = () => {
      fetch(COACHES_ENDPOINT)
      .then(response => response.json())
      .then(data => this.setState({ coaches: data }))
      .catch(error => console.error(error));
  };

  resetState = () => {
    this.getCoaches();
  };

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
            <CoachList
              coaches={this.state.coaches}
              resetState={this.resetState}
            />
      </div>
    );
  }
}

export default Coaches;