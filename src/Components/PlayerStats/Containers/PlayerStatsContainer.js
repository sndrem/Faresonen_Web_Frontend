import React, { Component } from "react";
import FaresoneMenu from "../../Menu/FaresoneMenu";

class PlayerStatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true
    };
  }
  render() {
    return (
      <div>
        <FaresoneMenu />
        <h1>{this.props.playerId}</h1>
      </div>
    );
  }
}
export default PlayerStatsContainer;
