import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Form, List } from "semantic-ui-react";

class DangerzoneSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        eliteserien: [],
        obosligaen: []
      },
      loading: true,
      search: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    const { eliteserien, obosligaen } = nextProps.players;
    this.setState({
      data: {
        eliteserien,
        obosligaen
      }
    });
  }

  formatPlayers = players => (
    <List.List>
      <List.Item>
        {players.map(p => (
          <List.Content key={p.name}>
            <List.Description>
              {p.name} - {p.value1} gule kort
            </List.Description>
          </List.Content>
        ))}
      </List.Item>
    </List.List>
  );

  createTeamElements = teams =>
    teams.map(team => {
      if (team.players.length === 0) {
        return "";
      }
      return (
        <List.Item key={team.team}>
          <List.Header>{team.team}</List.Header>
          <List.Description>{team.players.length} spillere</List.Description>
          {this.formatPlayers(team.players)}
        </List.Item>
      );
    });

  handleSearch = event => {
    const { value: search } = event.target;
    this.setState({ search });
  };

  searchFilter(search, leagueId) {
    if (this.state.data[leagueId] === undefined)
      throw new Error(
        `Wrong leagueId for ${leagueId}. Valid id's are ${Object.keys(
          this.state.data
        ).join(",")}`
      );
    const filteredPlayers = [];
    this.state.data[leagueId].forEach(team => {
      const filtered = team.players.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      filteredPlayers.push({ team: team.team, players: filtered });
    });
    return filteredPlayers;
  }

  render() {
    const eliteserienSearchFilter = this.searchFilter(
      this.state.search,
      "eliteserien"
    );
    const eliteserieElements = this.createTeamElements(eliteserienSearchFilter);

    const obosLigaenSearchFilter = this.searchFilter(
      this.state.search,
      "obosligaen"
    );
    const obosligaElements = this.createTeamElements(obosLigaenSearchFilter);

    return (
      <div>
        <Grid columns={1}>
          <Form>
            <Form.Field>
              <label>Søk etter spiller</label>
              <input
                placeholder="Fornavn/etternavn"
                onChange={this.handleSearch}
              />
            </Form.Field>
          </Form>
        </Grid>
        <Grid columns={2}>
          <Grid.Column>
            <h1>Eliteserien</h1>
            <List>{eliteserieElements}</List>
          </Grid.Column>
          <Grid.Column>
            <h1>OBOSligaen</h1>
            <List>{obosligaElements}</List>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
DangerzoneSearch.propTypes = {
  players: PropTypes.shape({
    eliteserien: PropTypes.arrayOf(
      PropTypes.shape({
        team: PropTypes.string.isRequired,
        players: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            value1: PropTypes.number.isRequired
          })
        ).isRequired
      })
    ).isRequired
  }).isRequired
};

export default DangerzoneSearch;
