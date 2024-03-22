import React, { Component } from "react";
import TimeSlotList from "./TimeSlotList";

class CoachList extends Component {
  render() {
    const coaches = this.props.coaches;
    return (
      <table >
        <tbody>
          {!coaches || coaches.length <= 0 ? (
            <tr>
              <td align="center">
                <b>No available coaches at this time</b>
              </td>
            </tr>
          ) : (
            coaches.map(coach => (
              <tr key={coach.id}>
                <td>{coach.full_name}</td>
                <td><TimeSlotList
                    coach={coach.id}
                    time_slots={coach.time_slots}
                /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  }
}

export default CoachList;