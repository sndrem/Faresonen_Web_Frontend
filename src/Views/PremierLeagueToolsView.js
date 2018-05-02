import React, { Component } from "react";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import TypeOfGraphicSubMenu from "../Components/PremierLeagueTools/TypeOfGraphicSubMenu";
import LiveTeaseGeneratorContainer from "../Components/PremierLeagueTools/Containers/LiveTeaseGeneratorContainer";
import ProgramTeaseGeneratorContainer from "../Components/PremierLeagueTools/Containers/ProgramTeaseGeneratorContainer";

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
      case "s18teasesuper":
        return <ProgramTeaseGeneratorContainer />;
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
