import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Feed, Icon, Message, Modal, Header } from "semantic-ui-react";
import tools from "../../Tools/tools";
import "./DangerzoneAccumulator.css";

class DangerZoneAccumulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        events: []
      },
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    const players = [];
    nextProps.events.forEach(p => {
      const uri = p.person1["@uri"];
      players.push(tools.getPersonData(uri));
    });
    tools
      .getMultiplePersonData(players, nextProps.events)
      .then(data => {
        this.setState({
          data: {
            events: data
          }
        });
      })
      .catch(err => console.warn(err));
  }

  getInfoMessage = () => (
    <Message
      info
      onClick={this.showModal}
      icon="info"
      header="Informasjon"
      content="Trykk her for mer informasjon om hvordan denne tjenesten virker"
    />
  );

  removeFeedEvent = event => {
    const index = this.state.data.events.indexOf(event);
    this.state.data.events.splice(index, 1);
    this.setState({
      data: {
        events: this.state.data.events
      }
    });
    this.props.removePlayer(event.player, "eliteserien");
    this.props.removePlayer(event.player, "obosligaen");
    this.props.removeEvent(event);
  };

  render() {
    const { events } = this.state.data;
    const elements = events
      .sort((a, b) => a.player.realTime <= b.player.realTime)
      .map(p => (
        <Feed.Event
          className="event-hover"
          onClick={() => this.removeFeedEvent(p)}
          key={p.player.id}
        >
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>
                {p.player.firstname} {p.player.lastname}
              </Feed.User>{" "}
              må stå over neste kamp
              <Feed.Date>{moment(p.event.realTime).fromNow()}</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="clock" />
                Registrert:{" "}
                {moment(p.event.realTime).format("DD-MM-YYYY HH:mm")}
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      ));
    return (
      <div>
        <Modal trigger={this.getInfoMessage()}>
          <Modal.Header>Informasjon om Faresonen</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Hvordan virker det?</Header>
              <p>
                Når du åpner siden du er på nå opprettes det en kobling til
                AltomFotball. Hvert 5 sekund sjekker serveren om det har kommet
                gule kort. Hvis det har kommet gule kort og spilleren som har
                fått gult kort allerede er i faresonen dukker han opp i listen
                under. Ved å klikke på navnet i listen blir spilleren markert
                som ferdig og dukker ikke opp i listen igjen.
              </p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <Feed>{elements}</Feed>
      </div>
    );
  }
}
DangerZoneAccumulator.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      person1: PropTypes.shape({
        "@uri": PropTypes.string.isRequired
      })
    })
  ).isRequired,
  removeEvent: PropTypes.func.isRequired,
  removePlayer: PropTypes.func.isRequired
};

export default DangerZoneAccumulator;
