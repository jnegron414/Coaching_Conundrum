import React, { Component, Fragment, useState } from "react";
import TimeSlotList from "./TimeSlotList";

import { USER_AUTH, COACHING_SESSION_FEEDBACK_ENDPOINT } from "../constants";

class CoachingSessionList extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      session_id: null
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal = (e) => {
    e.preventDefault()
    this.setState({ show: true, session_id: e.target.id });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(COACHING_SESSION_FEEDBACK_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': USER_AUTH,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session_id: this.state.session_id , note: event.target.note.value, rating: event.target.rating.value})
    }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
  };

  render() {
    const coaching_sessions = this.props.coaching_sessions;
    return (
      <Fragment>
          <table >
            <tbody>
              {!coaching_sessions || coaching_sessions.length <= 0 ? (
                <tr>
                  <td align="center">
                    <b>No upcoming/previous coaching sessions for this user</b>
                  </td>
                </tr>
              ) : (
                coaching_sessions.map(coaching_session => (
                  <tr key={coaching_session.id}>
                    <td>Coach: {coaching_session.coach.full_name}</td>
                    <td>Coach Phone Number: {coaching_session.coach.phone_number}</td>
                    <td>Student: {coaching_session.student.full_name}</td>
                    <td>Student Phone Number: {coaching_session.student.phone_number}</td>
                    <td>Time Slot: {coaching_session.time_slot.time_slot}</td>
                    {(coaching_session.show_feedback)
                        ? (coaching_session.feedback ?
                            <Fragment>
                                <td>Session Notes: {coaching_session.feedback.note}</td>
                                <td>Rating: {coaching_session.feedback.rating}</td>
                            </Fragment>
                            : <button id={coaching_session.id} onClick={this.showModal}>
                                Leave Feedback
                              </button>
                          )
                        : null
                    }
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <FeedbackModal show={this.state.show} handleSubmit={this.handleSubmit} handleClose={this.hideModal} />
      </ Fragment>
    );
  }
}

const FeedbackModal = ({ handleSubmit, handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  if (show) {
      return (
        <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="rating">Rating</label>
            <input id="rating" />
          </div>

          <div>
            <label htmlFor="note">Notes</label>
            <input id="note"/>
        </div>
        <div>
            <button type="submit">
              Submit
            </button>
            <button type="button" onClick={handleClose}>
              Close
            </button>
        </div>
      </form>
      );
  }
};

export default CoachingSessionList;