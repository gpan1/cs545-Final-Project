import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Study from "./components/Study.js";
import Test from "./components/Test.js";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/study" element={<Study />} />
          <Route exact path="/" element={<Test />} />
        </Routes>
      </Router>
    );
  }
}
