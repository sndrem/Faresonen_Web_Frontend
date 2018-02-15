import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Menu from './Menu';
import MainView from './MainView';

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
          <h1>Faresonen</h1>
          <Menu switchLeagueName={this.switchLeagueName.bind(this)}></Menu>
          <MainView leagueName={this.state.leagueName} tournamentId={this.state.tournamentId} seasonId={this.state.seasonId}></MainView>
      </Container>
    );
  }
}

export default App;
