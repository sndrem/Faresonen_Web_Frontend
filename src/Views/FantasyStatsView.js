import React, { Component } from "react";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import FantasyStatsContainer from "../Components/FantasyStats/Containers/FantasyStatsContainer";

class FantasyStatsView extends Component {
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
        <FantasyStatsContainer />
      </div>
    );
  }
}
export default FantasyStatsView;
