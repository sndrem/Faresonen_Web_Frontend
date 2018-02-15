import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Menu from './Menu';
import MainView from './MainView';

class App extends Component {

  state = {
    leagueName: 'Eliteserien'
  }

  switchLeagueName = (leagueName) => {
    this.setState({ leagueName });
  }  

  render() {
    return (
      <Container>
          <h1>Faresonen</h1>
          <Menu switchLeagueName={this.switchLeagueName.bind(this)}></Menu>
          <MainView leagueName={this.state.leagueName}></MainView>
      </Container>
    );
  }
}

export default App;
