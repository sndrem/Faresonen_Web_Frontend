import React, { Component } from "react";
import { Grid, Button, Segment, Divider, Header } from "semantic-ui-react";
import firebaseConfig from "../../databaseConfig/firebaseConfig";
import FirebaseService from "../../services/firebaseService";
import UpdateLeagues from "./UpdateLeagues";
import EditLeague from "./EditLeague";

class LeagueAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
      selectedLeague: null,
      loading: true
    };
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const service = new FirebaseService();
    service.getLeagues().then(leagues => {
      this.setState({ leagues, loading: false });
    });
  }

  setSelectedLeague = ({ id }) => {
    const selectedLeague = this.state.leagues.find(l => l.tournamentId === id);
    this.setState({ selectedLeague });
  };

  logOut = e => {
    e.preventDefault();
    firebaseConfig.auth().signOut();
  };

  render() {
    const { leagues, loading, selectedLeague } = this.state;
    return (
      <Segment>
        <p>
          Dette er admin-sidene til Faresonen. Her kan du opprette, endre og
          slette ligaer
        </p>
        <Button onClick={this.logOut}>Logg ut</Button>
        <Divider />
        <Header as="h2">Ligaer</Header>
        {loading ? <p>Henter ligaer...</p> : ""}
        <Grid columns="2">
          <Grid.Column>
            <UpdateLeagues
              leagues={leagues}
              loading={loading}
              setSelectedLeague={this.setSelectedLeague}
            />
          </Grid.Column>
          {!selectedLeague ? (
            ""
          ) : (
            <Grid.Column>
              <EditLeague league={selectedLeague} />
            </Grid.Column>
          )}
        </Grid>
      </Segment>
    );
  }
}
export default LeagueAdmin;
