import React, { Component } from "react";
import CoachingSessionList from "./CoachingSessionList";

import { USER_AUTH, COACHING_SESSION_ENDPOINT } from "../constants";

class CoachingSessions extends Component {
  state = {
    coaching_sessions: []
  };

  componentDidMount() {
    this.resetState();
  }

  getCoachingSessions = () => {
      fetch(COACHING_SESSION_ENDPOINT, {
          method: 'GET',
            headers: {
                'Authorization': USER_AUTH,
            },
      }).then(response => response.json())
        .then(data => this.setState({ coaching_sessions: data }))
        .catch(error => console.error(error));
  };

  resetState = () => {
    this.getCoachingSessions();
  };

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
            <CoachingSessionList
              coaching_sessions={this.state.coaching_sessions}
              resetState={this.resetState}
            />
      </div>
    );
  }
}

export default CoachingSessions;