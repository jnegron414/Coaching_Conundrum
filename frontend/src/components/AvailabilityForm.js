import React, { Component } from "react";

import { USER_AUTH, TIME_SLOT_ENDPOINT } from "../constants";


class AvailabilityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(TIME_SLOT_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': USER_AUTH,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time_slot: this.state.value })
    }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Time Slot (format: YYYY-MM-DD HH:MM:SS):
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AvailabilityForm;