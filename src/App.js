import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Menu from './Menu';
import MainView from './MainView';

class App extends Component {

  

  render() {
    return (
      <Container>
          <h1>Faresonen</h1>
          <Menu></Menu>
          <MainView></MainView>
      </Container>
    );
  }
}

export default App;
