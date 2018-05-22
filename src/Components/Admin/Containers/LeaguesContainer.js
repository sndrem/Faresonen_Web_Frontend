import React, { Component } from "react";
import AddLeaguesContainer from "./AddLeaguesContainer";
import RemoveLeaguesContainer from "./RemoveLeaguesContainer";
import FirebaseService from "../../../services/FirebaseService";
import altOmFotballLeagueService from "../../../services/altOmFotballLeagueService";

class LeaguesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      altOmFotballLeagues: [],
      leagues: [],
      selectedLeagues: [],
      loading: true
    };
    this.service = new FirebaseService();
    this.getAltOmFotballLeagues = this.getAltOmFotballLeagues.bind(this);
  }

  componentDidMount() {
    this.getAltOmFotballLeagues();
    this.getLeagues();
  }

  getLeagues = () => {
    this.service.getLeagues(this.processLeagues);
  };

  getAltOmFotballLeagues = () => {
    altOmFotballLeagueService.getAllLeagues().then(data => {
      this.setState({ altOmFotballLeagues: data.data.tournament });
    });
  };

  setSelectedLeagues = selectedLeagues => this.setState({ selectedLeagues });

  saveSelectedLeagues = selectedLeagues => {
    this.service.saveLeagues(selectedLeagues);
  };

  removeLeague = id => this.service.removeLeague(id);

  processLeagues = leagues => {
    this.setState({ leagues, loading: false });
  };

  render() {
    const {
      leagues,
      selectedLeagues,
      altOmFotballLeagues,
      loading
    } = this.state;
    return (
      <div>
        <AddLeaguesContainer
          altOmFotballLeagues={altOmFotballLeagues}
          selectedLeagues={selectedLeagues}
          setSelectedLeagues={this.setSelectedLeagues}
          saveSelectedLeagues={this.saveSelectedLeagues}
        />
        <RemoveLeaguesContainer
          leagues={leagues}
          loading={loading}
          removeLeague={this.removeLeague}
        />
      </div>
    );
  }
}
export default LeaguesContainer;
