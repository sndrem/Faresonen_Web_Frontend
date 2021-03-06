import React, {Component} from "react";
import PropTypes from "prop-types";
import {
  Header,
  Table,
  Segment,
  Dimmer,
  Loader,
  TextArea,
  Grid
} from "semantic-ui-react";
import moment from "moment";
import "moment/locale/nb";
import Abbreviations from "../../Tools/Abbreviations";
import "./MatchFeed.css";

class MatchFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        matches: [],
        freeText: ""
      },
      loading: true
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(
      {
        data: {
          matches: nextProps.matches
        },
        loading: false
      },
      () => {
        this.formatFreeText(this.props.league);
      }
    );
  }

  getBestBetColor = bet => {
    if (bet === null) {
      return "";
    }
    return bet ? "green" : "red";
  };

  createBetCell = (bet, bestBet = null) => {
    const cssColor = this.getBestBetColor(bestBet);
    if (bet) {
      return (
        <Table.Cell className={cssColor} width={3}>
          {this.formatPercent(bet)}
        </Table.Cell>
      );
    }
    return <Table.Cell>-</Table.Cell>;
  };

  betsNotReadyElement = match => (
    <Table.Row key={match.matchId}>
      <Table.Cell>
        {match.homeTeamName} -{match.awayTeamName}
      </Table.Cell>
      <Table.Cell width={5}>
        {moment(match.start).format("dddd DD. MMMM HH:mm")}
      </Table.Cell>
      {this.createBetCell()}
      {this.createBetCell()}
      {this.createBetCell()}
    </Table.Row>
  );

  createElements = matches => {
    if (!matches) return [];

    return matches.map(m => {
      if (!m.bets) return this.betsNotReadyElement(m);

      const {homeValue, drawValue, awayValue} = m.bets.oddsMarkets[0];
      return (
        <Table.Row key={m.matchId}>
          <Table.Cell>
            {m.homeTeamName} -{m.awayTeamName}
          </Table.Cell>
          <Table.Cell width={5}>
            {moment(m.start).format("dddd DD. MMMM HH:mm")}
          </Table.Cell>
          {this.createBetCell(homeValue, homeValue > awayValue)}
          {this.createBetCell(drawValue)}
          {this.createBetCell(awayValue, awayValue > homeValue)}
        </Table.Row>
      );
    });
  };

  formatPercent = value => `${(value * 100).toFixed(1)} %`;

  formatFreeText = league => {
    if (this.state.data.matches.length > 0) {
      const abbrevs = new Abbreviations();
      const text = this.state.data.matches
        .map(m => {
          if (!m.bets) return "";

          const homeTeamAbbrev = abbrevs.getAbbreviations(
            m.homeTeamName,
            league
          );
          const awayTeamAbbrev = abbrevs.getAbbreviations(
            m.awayTeamName,
            league
          );

          const homeTeamBet = this.formatPercent(
            m.bets.oddsMarkets[0].homeValue
          );

          const drawBet = this.formatPercent(m.bets.oddsMarkets[0].drawValue);

          const awayTeamBet = this.formatPercent(
            m.bets.oddsMarkets[0].awayValue
          );

          return `${homeTeamAbbrev} - ${awayTeamAbbrev}\nH: ${homeTeamBet} U: ${drawBet} B: ${awayTeamBet}`;
        })
        .join("\n\n");
      this.setState(prevState => ({
        data: {
          freeText: text,
          matches: prevState.data.matches
        }
      }));
    } else {
      this.setState(prevState => ({
        data: {
          freeText: "",
          matches: prevState.data.matches
        }
      }));
    }
  };

  render() {
    const elements = this.createElements(this.state.data.matches);
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Segment>
            <Dimmer active={this.state.loading}>
              <Loader>
                Henter kamper for
                {this.props.league}
              </Loader>
            </Dimmer>

            <Header as="h3">{this.props.league}</Header>

            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Kamp</Table.HeaderCell>
                  <Table.HeaderCell>Dato/Kl.</Table.HeaderCell>
                  <Table.HeaderCell>Hjemme</Table.HeaderCell>
                  <Table.HeaderCell>Uavgjort</Table.HeaderCell>
                  <Table.HeaderCell>Borte</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{elements}</Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Fritekst til stolpe</Header>
          <span>Her dukker bare kamper som begynner kl. 18.00 opp.</span>
          <TextArea
            className="wide-text"
            autoHeight
            value={this.state.data.freeText}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
MatchFeed.propTypes = {
  league: PropTypes.string.isRequired,
  matches: PropTypes.array.isRequired
};
export default MatchFeed;
