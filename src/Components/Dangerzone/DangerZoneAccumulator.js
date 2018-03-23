import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Feed, Icon } from "semantic-ui-react";
import tools from "../../Tools/tools";

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

  render() {
    const { events } = this.state.data;
    const elements = events
      .sort((a, b) => a.player.realTime <= b.player.realTime)
      //   .sort((a, b) => a.team >= b.team) // Add if the players should be sorted by team
      .map(p => {
        return (
          <Feed.Event key={p.player.id}>
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
                  <Icon name="like" />
                  4 Likes
                </Feed.Like>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        );
      });
    return <Feed>{elements}</Feed>;
  }
}
DangerZoneAccumulator.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      person1: PropTypes.string.isRequired
    })
  ).isRequired
};

export default DangerZoneAccumulator;
