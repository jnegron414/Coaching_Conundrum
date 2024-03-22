import React from 'react';
import {  Link } from "react-router-dom";
const NavBar = () => {
  return (
  <div>
    <li>
      <Link to="/coaches">Coaches</Link>
    </li>
    <li>
      <Link to="/coaching_sessions">Coaching Sessions</Link>
    </li>
    <li>
      <Link to="/update_availability">Update Availability</Link>
    </li>
  </div>
  );
}
export default NavBar;