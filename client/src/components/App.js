import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Navbar from "./Navbar";
import Slots from "./Slots";

class App extends Component {
  componentDidMount() {
    this.props.fetchSlots();
  }

  render() {
    return (
      <>
        <Navbar />
        <Slots  />
      </>
    );
  }
}

export default connect(null, actions)(App);
