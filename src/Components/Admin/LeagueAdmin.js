import React, { Component } from "react";

class LeagueAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true
    };
  }
  render() {
    return <p>League admin</p>;
  }
}
export default LeagueAdmin;
