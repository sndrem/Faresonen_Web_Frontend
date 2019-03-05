import React, {Component} from "react";
import {Container} from "semantic-ui-react";
import {HashRouter, Route, Switch} from "react-router-dom";
import ReactGA from "react-ga";
import FrontpageView from "./Views/FrontpageView";
import MainView from "./Views/MainView";
import RoundView from "./Views/RoundView";
import DangerzoneView from "./Views/DangerzoneView";
import FantasyView from "./Views/FantasyView";
import DetailedPlayerView from "./Views/DetailedPlayerView";
import GigSportsView from "./Views/GigSportsView";
import AdminView from "./Views/AdminView";
import NewUserView from "./Views/NewUserView";
import AboutView from "./Views/AboutView";
import FantasyStatsView from "./Views/FantasyStatsView";
import My404NotFound from "./Views/My404NotFound";
import FirebaseService from "./services/FirebaseService";
import GraphicsContainer from "./Components/PremierLeagueTools/Containers/GraphicsContainer";

function initializeReactGA() {
  ReactGA.initialize("UA-58175708-2");
  ReactGA.pageview("/forside");
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueName: "",
      tournamentId: "",
      seasonId: "",
      leagues: [],
      loading: true,
      error: ""
    };
    initializeReactGA();
    this.service = new FirebaseService();
  }

  componentDidMount() {
    this.service.getLeagues(this.processLeagues);
  }

  processLeagues = leagues => this.setState({leagues, loading: false});

  switchLeagueName = (leagueName, tournamentId, seasonId) => {
    this.setState({leagueName, tournamentId, seasonId});
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
                  leagues={this.state.leagues}
                  {...props}
                  loading={this.state.loading}
                  error={this.state.error}
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
            <Route exact path="/premierleague/" component={GraphicsContainer} />
            <Route exact path="/admin/" component={AdminView} />
            <Route exact path="/newuser" component={NewUserView} />
            <Route exact path="/about/" component={AboutView} />
            <Route path="*" exact component={My404NotFound} />
          </Switch>
        </HashRouter>
      </Container>
    );
  }
}

export default App;
