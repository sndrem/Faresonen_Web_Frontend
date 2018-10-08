import React, {Component} from "react";
import PropTypes from "prop-types";
import {
  Button, Segment, Header, Dropdown,
} from "semantic-ui-react";
import axios from "axios";
import altOmFotballLeagueService from "../../../services/altOmFotballLeagueService";

class AddLeaguesContainer extends Component {
  addLeagues = (e, {value: values}) => {
    // Get values and return promises for each
    const promises = values.map(value => altOmFotballLeagueService.getLeagueData(value));
    // Fetch data about each league
    axios.all(promises).then((data) => {
      const leagueData = data.map(d => d.data);
      this.props.setSelectedLeagues(leagueData);
    });
  };

  saveLeagues = () => {
    const leagues = {};
    this.props.selectedLeagues.forEach((league) => {
      leagues[league.id] = league;
    });

    this.props.saveSelectedLeagues(leagues);
  };

  render() {
    const {selectedLeagues, altOmFotballLeagues} = this.props;
    return (
      <Segment>
        <Header as="h2">Legg til ligaer</Header>
        <Dropdown
          placeholder="Velg ligaer"
          fluid
          multiple
          search
          selection
          onChange={this.addLeagues}
          options={altOmFotballLeagues.map(league => ({
            name: league.name,
            text: league.name,
            value: parseFloat(league.id),
          }))}
        />
        <Button
          disabled={selectedLeagues.length === 0}
          onClick={this.saveLeagues}
        >
          Lagre kamper til database
        </Button>
      </Segment>
    );
  }
}
AddLeaguesContainer.propTypes = {
  selectedLeagues: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  altOmFotballLeagues: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setSelectedLeagues: PropTypes.func.isRequired,
  saveSelectedLeagues: PropTypes.func.isRequired,
};
export default AddLeaguesContainer;
