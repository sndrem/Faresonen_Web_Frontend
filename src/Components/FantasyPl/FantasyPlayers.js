import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Header,
  Segment,
  Dimmer,
  Loader,
  Modal,
  Image,
  Icon
} from "semantic-ui-react";
import FantasyPlayerAnchor from "./FantasyPlayerAnchor";

class FantasyPlayers extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleOpen = () => {
  };

  render() {
    const { loading, teams } = this.props;
    return (
      <Segment>
        <Dimmer active={loading}>
          <Loader>Henter Fantasy-spillere</Loader>
        </Dimmer>

        <Header as="h1">Fantasy PL</Header>
        <Grid columns={4}>
          {Object.keys(teams).map(key => {
            if (teams[key].players.length === 0) {
              return "";
            }
            return (
              <Grid.Column key={key}>
                <Header as="h3">{teams[key].name}</Header>
                {Object.values(teams[key].players)
                  .sort((a, b) => a.first_name.localeCompare(b.first_name))
                  .map(player => (
                    <div key={player.id}>
                      <Modal
                        trigger={
                          <FantasyPlayerAnchor
                            onClick={this.handleOpen}
                            firstName={player.first_name}
                            secondName={player.second_name}
                            inDreamTeam={player.in_dreamteam}
                          />
                        }
                      >
                        <Modal.Header>
                          {player.first_name} {player.second_name}{" "}
                          {player.in_dreamteam ? (
                            <Icon name="star" color="yellow" />
                          ) : (
                            ""
                          )}
                        </Modal.Header>
                        <Modal.Content image>
                          <Image
                            wrapped
                            size="medium"
                            src={`http://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p${player.photo.replace(
                              "jpg",
                              "png"
                            )}`}
                          />
                          <Modal.Description>
                            <div>
                              <p>
                                <b>Pris: </b>£{player.now_cost / 10}
                              </p>
                              <p>
                                {" "}
                                <b>Poeng: </b>
                                {player.total_points}
                              </p>
                              <p>
                                {" "}
                                <b>Valgt av: </b>
                                {player.selected_by_percent}%
                              </p>
                              <p>
                                {" "}
                                <b>Skader: </b>
                                {player.news
                                  ? `${player.news}`
                                  : "Ingen skader."}
                              </p>
                              {player.chancee_of_playing_next_round ? (
                                <p>
                                  <b>Sjanse for å spille neste runde:</b>{" "}
                                  {player.chancee_of_playing_next_round}%
                                </p>
                              ) : (
                                ""
                              )}
                              <a href={`#/fantasy/player/${player.id}`}>
                                Mer info
                              </a>
                            </div>
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>

                      <span>£{player.now_cost / 10}</span>
                    </div>
                  ))}
              </Grid.Column>
            );
          })}
        </Grid>
      </Segment>
    );
  }
}
FantasyPlayers.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          first_name: PropTypes.string.isRequired,
          second_name: PropTypes.string.isRequired,
          now_cost: PropTypes.number.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default FantasyPlayers;
