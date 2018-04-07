import React, { Component } from "react";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import FantasyContainer from "../Components/FantasyPl/Containers/FantasyContainer";

class FantayView extends Component {
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
        <FantasyContainer />
      </div>
    );
  }
}
export default FantayView;
