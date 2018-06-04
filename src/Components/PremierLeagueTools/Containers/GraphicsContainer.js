import React, { Component } from "react";
import PremierLeagueToolsView from "../../../Views/PremierLeagueToolsView";
import ProgramTeaseGeneratorContainer from "./ProgramTeaseGeneratorContainer";
import LiveTeaseGeneratorContainer from "./LiveTeaseGeneratorContainer";
import altOmFotballLeagueService from "../../../services/altOmFotballLeagueService";
import AltOmFotballMatchService from "../../../services/altOmFotballMatchService";

class GraphicsContainer extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: "liveinfo",
      selectedLeague: "",
      leagues: [],
      matches: [],
      loading: true
    };
    this.getTypeOfGraphicComponents = this.getTypeOfGraphicComponents.bind(
      this
    );
    this.service = altOmFotballLeagueService;
    this.matchService = AltOmFotballMatchService;
    this.mapLeagues = this.mapLeagues.bind(this);
  }

  componentDidMount() {
    this.getLeagues();
  }

  getTypeOfGraphicComponents = type => {
    switch (type.toLowerCase()) {
      case "liveinfo":
        return (
          <LiveTeaseGeneratorContainer
            selectedLeague={this.state.selectedLeague}
          />
        );
      case "s18teasesuper":
        return (
          <ProgramTeaseGeneratorContainer
            selectedLeague={this.state.selectedLeague}
          />
        );
      default:
        return <p>Lol</p>;
    }
  };

  setSelectedLeague = selectedLeague => {
    this.setState({ selectedLeague });
  };

  getLeagues() {
    this.service.getAllLeagues().then(data => {
      this.setState({ leagues: data.data.tournament });
    });
  }

  updateActiveItem = item => {
    this.setState({ activeItem: item });
  };

  mapLeagues = leagues =>
    leagues.map(league => ({
      key: league.id + league.name,
      value: `${league.id}-${this.service.getActiveSeasonNumber(
        league.activeseason["@uri"]
      )}`,
      text: league.name
    }));

  render() {
    const element = this.getTypeOfGraphicComponents(this.state.activeItem);
    const mappedLeagues = this.mapLeagues(this.state.leagues);
    return (
      <PremierLeagueToolsView
        activeItem={this.state.activeItem}
        updateActiveItem={this.updateActiveItem}
        graphicComponent={element}
        setSelectedLeague={this.setSelectedLeague}
        selectedLeague={this.state.selectedLeague}
        leagues={mappedLeagues}
      />
    );
  }
}
export default GraphicsContainer;
