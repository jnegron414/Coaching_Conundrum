import React, { Component } from "react";

import { USER_AUTH, COACHING_SESSION_ENDPOINT } from "../constants";

class TimeSlotList extends Component {
  handleBookSession = (event) => {
    event.preventDefault();
    alert('Coaching Session Booked');
    let time_slot = Number(event.target.id);
    let coach = this.props.coach;

    fetch(COACHING_SESSION_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': USER_AUTH,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ time_slot_id: time_slot, coach_id: coach })
    }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
  };

  render() {
    const time_slots = this.props.time_slots;
    return (
      <table >
        <tbody>
          {!time_slots || time_slots.length <= 0 ? (
            <tr>
              <td align="center">
                <b>No available time slots for this coach</b>
              </td>
            </tr>
          ) : (
            time_slots.map(time_slot => (
              <tr key={time_slot.id}>
                <td>
                    <button id={time_slot.id} onClick={this.handleBookSession} >
                        {time_slot.time_slot}
                    </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
}


export default TimeSlotList;