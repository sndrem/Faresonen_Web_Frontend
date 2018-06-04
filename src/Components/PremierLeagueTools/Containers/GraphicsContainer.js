import React, { Component } from "react";
import PremierLeagueToolsView from "../../../Views/PremierLeagueToolsView";
import ProgramTeaseGeneratorContainer from "./ProgramTeaseGeneratorContainer";
import LiveTeaseGeneratorContainer from "./LiveTeaseGeneratorContainer";

class GraphicsContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "liveinfo"
    };
    this.getTypeOfGraphicComponents = this.getTypeOfGraphicComponents.bind(
      this
    );
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
      <PremierLeagueToolsView
        activeItem={this.state.activeItem}
        updateActiveItem={this.updateActiveItem}
        graphicComponent={element}
      />
    );
  }
}
export default GraphicsContainer;
