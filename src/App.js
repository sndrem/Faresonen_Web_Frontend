import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { HashRouter, Route, Switch } from "react-router-dom";
import FrontpageView from "./Views/FrontpageView";
import MainView from "./Views/MainView";
import RoundView from "./Views/RoundView";
import DangerzoneView from "./Views/DangerzoneView";
import Leagues from "./Data/leagues";

class App extends Component {
  state = {
    leagueName: "",
    tournamentId: "",
    seasonId: ""
  };

  switchLeagueName = (leagueName, tournamentId, seasonId) => {
    this.setState({ leagueName, tournamentId, seasonId });
  };

  render() {
    return (
      <Container>
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={props => (
                <FrontpageView
                  switchLeagueName={this.switchLeagueName}
                  leagueInfo={this.state}
                  leagues={Leagues.leagues}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/league/:leagueName/:tournamentId/:seasonId"
              component={props => <MainView {...props} />}
            />
            <Route
              exact
              path="/league/:tournamentId/:seasonId/:leagueName/round/:roundNumber/roundId/:roundId/nextRound/:nextRoundId"
              render={props => (
                <RoundView
                  tournamentId={this.state.tournamentId}
                  seasonId={this.state.seasonId}
                  leagueName={this.state.leagueName}
                  switchLeagueName={this.switchLeagueName}
                  {...props}
                />
              )}
            />
            <Route exact path="/dangerzone/" component={DangerzoneView} />
          </Switch>
        </HashRouter>
      </Container>
    );
  }
}

export default App;
