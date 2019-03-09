import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Grid, Statistic, Segment } from "semantic-ui-react";
import FaresoneMenu from "../../Menu/FaresoneMenu";
import PlayerProfile from "../PlayerProfile";

const PlayerStatsContainer = ({ playerId }) => {
  const [player, setPlayer] = useState({});
  const [team, setTeam] = useState({});

  useEffect(
    () => {
      axios.get(`/fantasy/player/${playerId}`).then(data => {
        const player = data.data;
        if (player.team_code) {
          getTeam(player.team_code);
        }
        setPlayer(player);
      });
    },
    [playerId]
  );

  // TODO Fetch team based on team code
  const getTeam = teamId => {
    axios.get(`/fantasy/team/${teamId}`).then(data => {
      setTeam(data.data);
    });
  };

  const mapStats = player => [
    { key: "goals", label: "Mål", value: player.goals_scored },
    { key: "assists", label: "Assists", value: player.assists },
    {
      key: "pointsPerGame",
      label: "Poeng per kamp",
      value: player.points_per_game
    },
    { key: "minPlayed", label: "Min. spilt", value: player.minutes },
    { key: "influence", label: "Påvirkning", value: player.influence },
    { key: "creativity", label: "Kreativitet", value: player.creativity },
    { key: "form", label: "Form", value: player.form },
    { key: "bonus", label: "Bonus", value: player.bonus }
  ];

  const items = mapStats(player);
  return (
    <div>
      <FaresoneMenu />
      <Grid columns={2}>
        <Grid.Column>
          <PlayerProfile
            name={`${player.first_name} ${player.second_name}`}
            teamName={team.name}
            news={player.news}
            photo={player.photo}
            chanceOfPlayingNextRound={player.chance_of_playing_next_round}
            inDreamTeam={player.in_dreamteam}
            points={player.total_points}
            selectedBy={player.selected_by_percent}
            cost={player.now_cost}
          />
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Statistic.Group widths={2} items={items} />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

PlayerStatsContainer.propTypes = {
  playerId: PropTypes.string.isRequired
};

export default PlayerStatsContainer;
