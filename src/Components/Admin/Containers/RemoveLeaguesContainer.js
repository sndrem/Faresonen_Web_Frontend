import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Header, Card, Dimmer, Loader } from "semantic-ui-react";
import "./RemoveLeaguesContainer.css";

class RemoveLeaguesContainer extends Component {
  removeLeague = event => {
    const { id } = event.target.dataset;
    this.props.removeLeague(id);
  };

  render() {
    const { leagues, loading } = this.props;
    return (
      <Segment>
        <Dimmer active={loading}>
          <Loader>Henter ligaer</Loader>
        </Dimmer>
        <Header as="h2">Fjern ligaer</Header>
        <Card.Group>
          {leagues.map(league => (
            <Card key={league.id}>
              <Card.Content>
                <Card.Header>{league.name}</Card.Header>
                <Card.Meta>ID: {league.id}</Card.Meta>
                <Card.Meta>
                  Aktiv sesong:{" "}
                  <a href={league.activeseason["@uri"]}>
                    {league.activeseason["@uri"]}
                  </a>
                </Card.Meta>
                <Card.Description
                  className="remove-league"
                  data-id={league.id}
                  onClick={this.removeLeague}
                >
                  Klikk her for å fjerne ligaen
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Segment>
    );
  }
}
RemoveLeaguesContainer.propTypes = {
  leagues: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      activeseason: PropTypes.shape({
        "@uri": PropTypes.string.isRequired
      }).isRequired,
      id: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  removeLeague: PropTypes.func.isRequired
};
export default RemoveLeaguesContainer;
