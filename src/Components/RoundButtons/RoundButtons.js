import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { List } from "semantic-ui-react";
import "./RoundButtons.css";

const RoundButtons = ({ now, tournamentId, seasonId, leagueName, rounds }) => {
  const getNextRoundId = (rounds, index) =>
    rounds[index + 1] ? rounds[index + 1].id : -1;

  const createRoundButtons = rounds =>
    rounds.map((round, index, array) => {
      const endDate = round.enddate;

      // eslint-disable-next-line
      round.nextRoundId = getNextRoundId(array, index);
      const finished = endDate <= now;
      const button = createRoundButton(round, finished);

      return <List.Item key={round["@uri"]}>{button}</List.Item>;
    });

  const createUrl = roundInfo =>
    `#/league/${tournamentId}/${seasonId}/${leagueName}/round/${
      roundInfo.roundNo
    }/roundId/${roundInfo.id}/nextRound/${roundInfo.nextRoundId}`;

  const createFinishedButton = roundInfo => (
    <a href={createUrl(roundInfo)} className="round-buttons finished">
      {roundInfo.name}
    </a>
  );

  const createNotFinishedButton = roundInfo => (
    <a href={createUrl(roundInfo)} className="round-buttons">
      {roundInfo.name}
      <span className="startDate">
        Starter: {moment(roundInfo.startdate).format("DD.MM.YYYY")}
      </span>
    </a>
  );

  const createRoundButton = (roundInfo, finished = false) =>
    finished
      ? createFinishedButton(roundInfo)
      : createNotFinishedButton(roundInfo);

  if (!rounds) {
    return (
      <p>
        Kan ikke hente runder for
        {leagueName}
      </p>
    );
  }
  return <List>{createRoundButtons(rounds)}</List>;
};

RoundButtons.propTypes = {
  leagueName: PropTypes.string.isRequired,
  tournamentId: PropTypes.number.isRequired,
  seasonId: PropTypes.number.isRequired,
  rounds: PropTypes.arrayOf(
    PropTypes.shape({
      "@uri": PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nextRoundId: PropTypes.string,
      roundNo: PropTypes.string.isRequired
    })
  ).isRequired,
  now: PropTypes.string.isRequired
};

export default RoundButtons;
