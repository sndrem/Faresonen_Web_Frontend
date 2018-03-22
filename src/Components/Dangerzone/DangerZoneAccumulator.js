import React, { Component } from "react";
import { Feed, Icon } from "semantic-ui-react";

class DangerZoneAccumulator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true
    };
  }
  render() {
    return (
      <Feed>
        <Feed.Event>
          <Feed.Label>
            <img src="http://fillmurray.com/200/200" />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>Elliot Fu</Feed.User> added you as a friend
              <Feed.Date>1 Hour Ago</Feed.Date>
            </Feed.Summary>
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />
                4 Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    );
  }
}
export default DangerZoneAccumulator;
