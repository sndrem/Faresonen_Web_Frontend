import React, { Component } from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import UpdateLeagues from "../UpdateLeagues";
import EditLeague from "../EditLeague";

class EditLeaguesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagues: [],
      selectedLeague: null,
      loading: true
    };
  }

  // componentDidMount() {
  //   const service = new FirebaseService();
  //   service.getLeagues().then(leagues => {
  //     console.log(leagues);
  //     this.setState({ leagues, loading: false });
  //   });
  // }

  setSelectedLeague = ({ id }) => {
    const selectedLeague = this.state.leagues.find(
      l => parseFloat(l.id) === id
    );
    this.setState({ selectedLeague });
  };

  render() {
    const { loading, selectedLeague, leagues } = this.state;
    return (
      <Segment>
        <Header as="h2">Rediger ligaer</Header>
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
export default EditLeaguesContainer;
