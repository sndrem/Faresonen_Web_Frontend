import React, { Component } from "react";
import { Button, Segment, Divider } from "semantic-ui-react";
import firebaseConfig from "../../databaseConfig/firebaseConfig";
import LeaguesContainer from "./Containers/LeaguesContainer";

class LeagueAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut = e => {
    e.preventDefault();
    firebaseConfig.auth().signOut();
  };

  render() {
    return (
      <Segment>
        <p>
          Dette er admin-sidene til Faresonen. Her kan du opprette, endre og
          slette ligaer
        </p>
        <Button onClick={this.logOut}>Logg ut</Button>
        <Divider />
        <LeaguesContainer />

        {/* <EditLeaguesContainer /> */}
      </Segment>
    );
  }
}
export default LeagueAdmin;