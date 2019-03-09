import React, {Component} from "react";
import PropTypes from "prop-types";
import {Header, Segment, Form, Button} from "semantic-ui-react";
import inputParser from "../../Tools/inputParsers";

class EditLeague extends Component {
  constructor(props) {
    super(props);
    const {name, seasonId, tournamentId} = props.league;
    this.state = {
      data: {
        name,
        seasonId,
        tournamentId
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    const {name, seasonId, tournamentId} = nextProps.league;
    this.setState({
      data: {
        name,
        seasonId,
        tournamentId
      }
    });
  };

  handleChange = e => {
    e.preventDefault();
    const parseType = e.target.dataset.parse;
    if (parseType) {
      const parser = inputParser[parseType];
      const parsedValue = parser(e.target.value);
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          [e.target.name]: parsedValue
        }
      }));
      return;
    }
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [e.target.name]: e.target.value
      }
    }));
  };

  render() {
    const {name, seasonId, tournamentId} = this.state.data;
    return (
      <Segment color="red">
        <Header as="h3">
          Liga:
          {this.props.league.name}
        </Header>
        <Form onSubmit={this.submit}>
          <Form.Field>
            <label htmlFor="leagueName">Navn</label>
            <input
              placeholder="Navn på serien"
              name="name"
              id="leagueName"
              value={name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="leagueSeasonID">SesongID</label>
            <input
              placeholder="SesongID"
              name="seasonId"
              id="leagueSeasonID"
              value={seasonId}
              onChange={this.handleChange}
              type="number"
              data-parse="number"
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="leagueTournamentID">TurneringsID</label>
            <input
              placeholder="TurneringsID"
              name="tournamentId"
              id="leagueTournamentID"
              value={tournamentId}
              onChange={this.handleChange}
              type="number"
              data-parse="number"
            />
          </Form.Field>
          <Button color="green" type="submit">
            Oppdater
          </Button>
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
