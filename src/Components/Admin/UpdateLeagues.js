import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Dropdown } from "semantic-ui-react";

class UpdateLeagues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      league: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e, { value }) => {
    this.props.setSelectedLeague({ id: value });
  };

  render() {
    return (
      <Segment color="blue">
        <Dropdown
          name="league"
          placeholder="Velg liga du vil oppdatere"
          options={this.props.leagues.map(league => {
            return { text: league.name, value: league.tournamentId };
          })}
          fluid
          selection
          loading={this.props.loading}
          onChange={this.handleChange}
        />{" "}
      </Segment>
    );
  }
}
UpdateLeagues.propTypes = {
  leagues: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  setSelectedLeague: PropTypes.func.isRequired
};
export default UpdateLeagues;
