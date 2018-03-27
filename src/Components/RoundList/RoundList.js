import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { List, Button, Segment, Dimmer, Loader } from "semantic-ui-react";
import "./RoundList.css";

class RoundList extends Component {
  state = {
    tournamentId: this.props.tournamentId,
    seasonId: this.props.seasonId,
    leagueName: this.props.leagueName,
    rounds: [],
    loading: true
  };

  componentDidMount() {
    const { tournamentId, seasonId } = this.state;
    this.getRounds(tournamentId, seasonId);
  }

  componentWillReceiveProps(nextProps) {
    const { tournamentId, seasonId } = nextProps;
    this.getRounds(tournamentId, seasonId);
  }

  getRounds = (tournamentId, seasonId) => {
    axios
      .get(`/rounds/${tournamentId}/${seasonId}`)
      .then(data => {
        this.setState({
          rounds: data.data.round,
          loading: false
        });
      })
      .catch(() => this.setState({ rounds: [] }));
  };

  createRoundButtons = rounds =>
    rounds.map((r, index, array) => {
      const round = r;
      const endDate = r.enddate;
      const now = new Date().toISOString();
      const nextRoundId = array[index + 1] ? array[index + 1].id : -1;
      round.nextRoundId = nextRoundId;
      const finished = endDate <= now;
      const button = this.createRoundButton(round, finished);

      return <List.Item key={round["@uri"]}>{button}</List.Item>;
    });

  createRoundButton = (roundInfo, finished = false) => {
    if (finished) {
      return (
        <Button
          as={Link}
          to={`/league/${this.state.tournamentId}/${this.state.seasonId}/${
            this.state.leagueName
          }/round/${roundInfo.roundNo}/roundId/${roundInfo.id}/nextRound/${
            roundInfo.nextRoundId
          }`}
          className="round-buttons"
          fluid
          color="red"
        >
          {roundInfo.name}
        </Button>
      );
    }
    return (
      <Button
        as={Link}
        to={`/league/${this.state.tournamentId}/${this.state.seasonId}/${
          this.state.leagueName
        }/round/${roundInfo.roundNo}/roundId/${roundInfo.id}/nextRound/${
          roundInfo.nextRoundId
        }`}
        className="round-buttons"
        fluid
        color="blue"
      >
        {roundInfo.name}
      </Button>
    );
  };

  render() {
    if (!this.state.rounds) {
      return <p>Kan ikke hente runder for {this.props.leagueName}</p>;
    }

    const roundElements = this.createRoundButtons(this.state.rounds);
    return (
      <Segment>
        <Dimmer active={this.state.loading}>
          <Loader>Henter runder for {this.state.leagueName}</Loader>
        </Dimmer>
        <List>{roundElements}</List>
      </Segment>
    );
  }
}

RoundList.propTypes = {
  tournamentId: PropTypes.number.isRequired,
  seasonId: PropTypes.number.isRequired,
  leagueName: PropTypes.string.isRequired
};

export default RoundList;
