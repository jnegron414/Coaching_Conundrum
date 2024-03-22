import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";

import NavBar from "./components/NavBar"
import Coaches from "./components/Coaches";
import CoachingSessions from "./components/CoachingSessions";
import AvailabilityForm from "./components/AvailabilityForm";


class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/coaches' element={<Coaches />} />
            <Route path='/coaching_sessions' element={<CoachingSessions />} />
            <Route path='/update_availability' element={<AvailabilityForm />} />
          </Routes>
        </Router>
    </Fragment>
    );
  }
}

export default App;
