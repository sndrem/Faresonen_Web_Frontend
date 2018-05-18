import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { HashRouter, Route, Switch } from "react-router-dom";
import firebaseConfig from "./databaseConfig/firebaseConfig";
import FrontpageView from "./Views/FrontpageView";
import MainView from "./Views/MainView";
import RoundView from "./Views/RoundView";
import DangerzoneView from "./Views/DangerzoneView";
import FantasyView from "./Views/FantasyView";
import DetailedPlayerView from "./Views/DetailedPlayerView";
import GigSportsView from "./Views/GigSportsView";
import PremierLeagueToolsView from "./Views/PremierLeagueToolsView";
import AboutView from "./Views/AboutView";
import Leagues from "./Data/leagues";
import FantasyStatsView from "./Views/FantasyStatsView";

class App extends Component {
  state = {
    leagueName: "",
    tournamentId: "",
    seasonId: "",
    user: {}
  };

  componentDidMount() {
    this.authListener();
  }

  // Authentication listener
  authListener() {
    firebaseConfig.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  switchLeagueName = (leagueName, tournamentId, seasonId) => {
    this.setState({ leagueName, tournamentId, seasonId });
  };

  render() {
    return !this.state.user ? (
      <p>Ingen bruker er logget inn. Du må logge inn først</p>
    ) : (
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
            <Route exact path="/fantasy/" component={FantasyView} />
            <Route exact path="/fantasy/stats" component={FantasyStatsView} />
            <Route
              exact
              path="/fantasy/player/:playerId"
              component={DetailedPlayerView}
            />
            <Route exact path="/gigsports/" component={GigSportsView} />
            <Route
              exact
              path="/premierleague/"
              component={PremierLeagueToolsView}
            />
            <Route exact path="/about/" component={AboutView} />
          </Switch>
        </HashRouter>
      </Container>
    );
  }
}

export default App;
