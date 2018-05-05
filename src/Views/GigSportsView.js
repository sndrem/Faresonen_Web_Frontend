import React, { Component } from "react";
import moment from "moment";
import {
  Header,
  Segment,
  Loader,
  Dimmer,
  Divider,
  Message
} from "semantic-ui-react";
import MatchFeed from "../Components/Feeds/MatchFeed";
import DateFilter from "../Components/Filters/DateFilter";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";

class GigSportsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        eliteserien: [],
        obosligaen: []
      },
      dateFilter: new Date(),
      loading: true,
      error: ""
    };
  }

  componentDidMount() {
    document.title = "Odds";
    Promise.all([this.fetchMatches(), this.fetchBets()])
      .then(values => {
        const eliteserien = this.extractLeague(values, 0);

        const obosligaen = this.addHours(this.extractLeague(values, 1), 2);

        const bets = values[1].feed;
        const eliteserieBets = this.connectGamesAndBets(eliteserien, bets);
        const obosligaBets = this.connectGamesAndBets(obosligaen, bets);
        this.setState({
          data: {
            eliteserien: eliteserieBets,
            obosligaen: obosligaBets
          },
          loading: false
        });
      })
      .catch(err => {
        this.updateError("Kunne ikke hente odds. Er du koblet til internett?");
      });
  }

  extractLeague = (values, index) => {
    try {
      return values[0].competitions[index].matches;
    } catch (err) {
      this.setState({
        error: "problem fetching data"
      });
    }
  };

  addHours = (matches, hour) => {
    if (matches) {
      return matches.map(match => ({
        ...match,
        start: moment(match.start)
          .add(hour, "hours")
          .format()
      }));
    }
    return [];
  };

  filterMatchesByDate = (matches, date = new Date()) => {
    return matches.filter(match => {
      const matchDay = new Date(match.start).toDateString();
      return matchDay === date.toDateString();
    });
  };

  connectGamesAndBets = (matches, bets) => {
    return matches.map(match => {
      const foundBet = bets.find(bet => bet.matchId === match.matchId);
      match.bets = foundBet;
      return match;
    });
  };

  fetchMatches = () => {
    return fetch(
      "https://api-starfleet.oddsmodel.com/Customers/TV2/MatchFeed?apiKey=a1476rz9nz3wh0x5denb8ij54cxo47yr"
    )
      .then(response => response.json())
      .catch(err =>
        this.updateError(
          "Kunne ikke hente kamper fra GIG Sports. Er du koblet til internett?"
        )
      );
  };

  fetchBets = () => {
    return fetch(
      "https://api-starfleet.oddsmodel.com/Customers/Tv2/OddsFeed/Pregame?apiKey=a1476rz9nz3wh0x5denb8ij54cxo47yr"
    )
      .then(response => response.json())
      .catch(err =>
        this.updateError(
          "Kunne ikke hente odds fra GIG Sports. Er du koblet til internett?"
        )
      );
  };

  updateDate = date => this.setState({ dateFilter: date });

  updateError = message =>
    this.setState({ ...this.state, error: message, loading: false });

  render() {
    let { eliteserien, obosligaen } = this.state.data;
    eliteserien = this.filterMatchesByDate(eliteserien, this.state.dateFilter);
    obosligaen = this.filterMatchesByDate(obosligaen, this.state.dateFilter);
    return (
      <div>
        <FaresoneMenu />
        <Segment>
          <Dimmer active={this.state.loading}>
            <Loader>Henter kamper</Loader>
          </Dimmer>
          {this.state.error ? (
            <Message info>{this.state.error}</Message>
          ) : (
            <Header as="h1">Odds</Header>
          )}
          <DateFilter updateDate={this.updateDate} />
          <Divider />
          <MatchFeed matches={eliteserien} league="Eliteserien" />
          <MatchFeed matches={obosligaen} league="Obosligaen" />
        </Segment>
      </div>
    );
  }
}
export default GigSportsView;
