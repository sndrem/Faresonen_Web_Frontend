import React, {Component} from "react";
import axios from "axios";
import {Segment, Message} from "semantic-ui-react";
import FantasyPlayerFilter from "../FantasyPlayerFilter";
import FantasyPlayers from "../FantasyPlayers";

class FantasyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        teams: []
      },
      filters: {
        priceFilter: -1,
        nameFilter: "",
        onlyDreamTeam: false
      },
      loading: true,
      error: ""
    };
  }

  componentDidMount() {
    axios
      .all([this.getPlayers(), this.getTeams()])
      .then(data => {
        const players = data[0].data;
        const teams = data[1].data;
        let groupedTeams = this.groupTeams(players, teams);
        groupedTeams = Object.values(groupedTeams)
          .map(team => team)
          .sort((teamA, teamB) => teamA.name.localeCompare(teamB.name));
        this.setState({
          data: {
            teams: groupedTeams
          },
          loading: false,
          error: ""
        });
      })
      .catch(() => {
        this.setState({
          error:
            "Det oppsto dessverre et problem ved henting av spillere. Det kan være fordi PL-Fantasy oppdateres eller fordi du ikke er koblet til internett.",
          loading: false
        });
      });
  }

  getPlayers = () => axios.get("/fantasy/players");

  getTeams = () => axios.get("/fantasy/teams");

  setNameFilter = filter => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        nameFilter: filter
      }
    }));
  };

  setPriceFilter = filter => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        priceFilter: filter
      }
    }));
  };

  setDreamTeamFilter = filter => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        onlyDreamTeam: filter
      }
    }));
  };

  filterTeams = (teams, filters) => {
    if (
      !filters.nameFilter &&
      filters.priceFilter < 0 &&
      !filters.onlyDreamTeam
    )
      return teams;
    // Dette er kanskje en veldig rar løsning på filtreringen, men jeg er bakfull og gidder ikke se mer på det nå. Det
    // virker enn så lenge... 08.04.18
    const filtered = teams.map(team => {
      const teamCopy = Object.assign({}, team);
      const filteredPlayers = teamCopy.players.filter(player => {
        if (filters.onlyDreamTeam) {
          return player.in_dreamteam;
        }
        if (filters.priceFilter <= 0) {
          return this.mergeName(player.first_name, player.second_name)
            .toLowerCase()
            .includes(filters.nameFilter);
        }
        if (filters.priceFilter > 0 && !filters.nameFilter) {
          return this.formatPrice(player.now_cost) >= filters.priceFilter;
        }
        if (filters.onlyDreamTeam) {
          return player.in_dreamteam;
        }
        return (
          this.mergeName(player.first_name, player.second_name)
            .toLowerCase()
            .includes(filters.nameFilter) &&
          this.formatPrice(player.now_cost) >= filters.priceFilter
        );
      });
      teamCopy.players = filteredPlayers;
      return teamCopy;
    });
    return filtered;
  };

  mergeName = (first, last) => `${first} ${last}`;

  formatPrice = price => price / 10;

  groupTeams = (players, teams) =>
    players.reduce((obj, player) => {
      const team = teams.find(
        teamToFind => teamToFind.code === player.team_code
      );
      if (obj[player.team_code]) {
        // eslint-disable-next-line
        player.team = team;
        obj[player.team_code].players.push(player);
      } else {
        // eslint-disable-next-line
        obj[player.team_code] = {
          name: team.name,
          players: []
        };
      }
      return obj;
    }, {});

  render() {
    const teams = this.filterTeams(this.state.data.teams, this.state.filters);
    return (
      <div>
        {this.state.error ? (
          <Segment>
            <Message warning>{this.state.error}</Message>
          </Segment>
        ) : (
          ""
        )}
        <FantasyPlayerFilter
          setNameFilter={this.setNameFilter}
          setPriceFilter={this.setPriceFilter}
          setDreamTeamFilter={this.setDreamTeamFilter}
        />
        <FantasyPlayers teams={teams} loading={this.state.loading} />
      </div>
    );
  }
}
export default FantasyContainer;
