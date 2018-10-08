import React, {Component} from "react";
import PropTypes from "prop-types";
import {Segment, Dropdown} from "semantic-ui-react";

class UpdateLeagues extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e, {value}) => {
    this.props.setSelectedLeague({id: value});
  };

  createOptions = leagues =>
    leagues.map(league => ({
      text: league.name,
      value: parseFloat(league.id),
      name: league.name
    }));

  render() {
    const options = this.createOptions(this.props.leagues);
    return (
      <Segment color="blue">
        <Dropdown
          name="league"
          placeholder="Velg liga du vil oppdatere"
          options={options}
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
