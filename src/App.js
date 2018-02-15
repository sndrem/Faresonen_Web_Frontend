import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Menu from './Menu';

class App extends Component {

  

  render() {
    return (
      <Container>
          <h1>Faresonen</h1>
          <Menu></Menu>
      </Container>
    );
  }
}

export default App;
