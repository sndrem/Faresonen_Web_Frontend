import React, { Component } from "react";
import moment from "moment";
import { Feed, Icon } from "semantic-ui-react";

class DangerZoneAccumulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        suspendedPlayers: []
      },
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: {
        suspendedPlayers: nextProps.players
      }
    });
  }
  render() {
    const { suspendedPlayers } = this.state.data;
    const elements = suspendedPlayers
      .sort((a, b) => a.updated <= b.updated)
      //   .sort((a, b) => a.team >= b.team) // Add if the players should be sorted by team
      .map(p => {
        console.log(p);
        return (
          <Feed.Event key={p.name}>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>{p.name}</Feed.User> for {p.team} må stå over neste
                kamp
                <Feed.Date>{moment(p.updated).fromNow()}</Feed.Date>
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
export default DangerZoneAccumulator;
