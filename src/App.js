import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainView from './Views/MainView';
import LeagueView from './Views/LeagueView';
import RoundView from './Views/RoundView';

class App extends Component {

  render() {
    return (
      <Container>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={MainView}/>
            {/*<Route exact path='/league/:id' component={LeagueView}/>*/}
            <Route exact path='/league/:leagueId/round/:roundId' component={RoundView}/>
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
