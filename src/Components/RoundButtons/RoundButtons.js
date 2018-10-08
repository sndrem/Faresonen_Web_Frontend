import React, {Component} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {List} from "semantic-ui-react";
import "./RoundButtons.css";

class RoundButtons extends Component {
  getNextRoundId = (rounds, index) => (rounds[index + 1] ? rounds[index + 1].id : -1);

  createRoundButtons = rounds => rounds.map((round, index, array) => {
    const endDate = round.enddate;

    // eslint-disable-next-line
      round.nextRoundId = this.getNextRoundId(array, index);
    const finished = endDate <= this.props.now;
    const button = this.createRoundButton(round, finished);

    return <List.Item key={round["@uri"]}>{button}</List.Item>;
  });

  createUrl = roundInfo => `#/league/${this.props.tournamentId}/${this.props.seasonId}/${
    this.props.leagueName
  }/round/${roundInfo.roundNo}/roundId/${roundInfo.id}/nextRound/${
    roundInfo.nextRoundId
  }`;

  createFinishedButton = roundInfo => (
    <a href={this.createUrl(roundInfo)} className="round-buttons finished">
      {roundInfo.name}
    </a>
  );

  createNotFinishedButton = roundInfo => (
    <a href={this.createUrl(roundInfo)} className="round-buttons">
      {roundInfo.name}
      <span className="startDate">
        Starter:
        {" "}
        {moment(roundInfo.startdate).format("DD.MM.YYYY")}
      </span>
    </a>
  );

  createRoundButton = (roundInfo, finished = false) => (finished
    ? this.createFinishedButton(roundInfo)
    : this.createNotFinishedButton(roundInfo));

  render() {
    if (!this.props.rounds) {
      return (
        <p>
Kan ikke hente runder for
          {this.props.leagueName}
        </p>
      );
    }
    return <List>{this.createRoundButtons(this.props.rounds)}</List>;
  }
}

RoundButtons.propTypes = {
  leagueName: PropTypes.string.isRequired,
  tournamentId: PropTypes.number.isRequired,
  seasonId: PropTypes.number.isRequired,
  rounds: PropTypes.arrayOf(
    PropTypes.shape({
      "@uri": PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nextRoundId: PropTypes.string,
      roundNo: PropTypes.string.isRequired,
    }),
  ).isRequired,
  now: PropTypes.string.isRequired,
};

export default RoundButtons;
