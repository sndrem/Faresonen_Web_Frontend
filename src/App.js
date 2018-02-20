import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FrontpageView from './Views/FrontpageView';
import MainView from './Views/MainView';
import RoundView from './Views/RoundView';

class App extends Component {

  state = {
      leagueName: 'Eliteserien',
      tournamentId: 1,
      seasonId: 340
  }

  switchLeagueName = (leagueName, tournamentId, seasonId) => {
    this.setState({ leagueName, tournamentId, seasonId});
  }  

  render() {
    return (
      <Container>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={(props) => <FrontpageView switchLeagueName={this.switchLeagueName.bind(this)} leagueInfo={this.state} {...props}/>}/>
            <Route exact path='/league/:leagueId/:seasonId' component={(props) => <MainView leagueInfo={this.state} {...props}/>}/>
            <Route exact path='/league/:leagueId/:seasonId/:leagueName/round/:roundNumber/roundId/:roundId/nextRound/:nextRoundId' render={(props) => <RoundView tournamentId={this.state.tournamentId} seasonId={this.state.seasonId} leagueName={this.state.leagueName} switchLeagueName={this.switchLeagueName.bind(this)} {...props}/>}/>
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
