import React, { Component } from "react";
import moment from "moment";
import { Feed, Icon } from "semantic-ui-react";
import tools from "../../Tools/tools";

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
    const players = [];
    nextProps.players.forEach(p => {
      const uri = p.person1["@uri"];
      players.push(tools.getPersonData(uri));
    });
    tools
      .getMultiplePersonData(players)
      .then(data => {
        const playerInfo = this.extractPlayerInformation(data);
        this.setState({
          data: {
            suspendedPlayers: playerInfo
          }
        });
      })
      .catch(err => console.warn(err));
  }

  extractPlayerInformation(players) {
    return players.map(p => {
      return p.data;
    });
  }

  render() {
    const { suspendedPlayers } = this.state.data;
    console.log(suspendedPlayers);
    const elements = suspendedPlayers
      .sort((a, b) => a.realTime <= b.realTime)
      //   .sort((a, b) => a.team >= b.team) // Add if the players should be sorted by team
      .map(p => {
        return (
          <Feed.Event key={p.id}>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>
                  {p.firstname} {p.lastname}
                </Feed.User>{" "}
                må stå over neste kamp
                <Feed.Date>{moment(p.realTime).fromNow()}</Feed.Date>
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
