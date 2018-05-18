import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Segment, Form, Button } from "semantic-ui-react";

class EditLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true
    };
  }
  render() {
    const { name, seasonId, tournamentId } = this.props.league;
    return (
      <Segment color="red">
        <Header as="h3">Liga: {this.props.league.name}</Header>
        <Form>
          <Form.Field>
            <label htmlFor="leagueName">Navn</label>
            <input
              placeholder="Navn på serien"
              name="leagueName"
              value={name}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="leagueSeasonID">SesongID</label>
            <input
              placeholder="SesongID"
              name="leagueSeasonID"
              value={seasonId}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="leagueTournamentID">TurneringsID</label>
            <input
              placeholder="TurneringsID"
              name="leagueTournamentID"
              value={tournamentId}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Segment>
    );
  }
}

EditLeague.propTypes = {
  league: PropTypes.shape({
    name: PropTypes.string.isRequired,
    seasonId: PropTypes.number.isRequired,
    tournamentId: PropTypes.number.isRequired
  }).isRequired
};

export default EditLeague;
