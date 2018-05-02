import React, { Component } from "react";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import TypeOfGraphicSubMenu from "../Components/PremierLeagueTools/TypeOfGraphicSubMenu";
import LiveTeaseGeneratorContainer from "../Components/PremierLeagueTools/Containers/LiveTeaseGeneratorContainer";

class PremierLeagueToolsView extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "liveinfo"
    };
  }

  getTypeOfGraphicComponents = type => {
    switch (type.toLowerCase()) {
      case "liveinfo":
        return <LiveTeaseGeneratorContainer />;
      default:
        return <p>Lol</p>;
    }
  };

  updateActiveItem = item => {
    this.setState({ activeItem: item });
  };

  render() {
    const element = this.getTypeOfGraphicComponents(this.state.activeItem);
    return (
      <div>
        <FaresoneMenu />
        <TypeOfGraphicSubMenu
          updateActiveItem={this.updateActiveItem}
          activeItem={this.state.activeItem}
        />
        {element}
      </div>
    );
  }
}

export default PremierLeagueToolsView;
