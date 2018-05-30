import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

class EditChannels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true
    };
  }
  render() {
    const { channels } = this.props;
    return (
      <Grid columns={2}>
        {channels.map(channel => {
          return <Grid.Column>{JSON.stringify(channel)}</Grid.Column>;
        })}
      </Grid>
    );
  }
}
export default EditChannels;
