import React, {Component} from "react";
import PropTypes from "prop-types";
import {Table} from "semantic-ui-react";
import axios from "axios";
import tools from "../../Tools/tools";

class NextMatchInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchInfo: props.matchInfo,
      nextRoundNumber: parseInt(props.nextRoundNumber, 10) + 1,
      stadium: "",
      channel: "",
      date: tools.getDate(props.matchInfo.starttime),
      time: tools.getTime(props.matchInfo.starttime),
    };

    axios.all([tools.getChannelAndStadium(props.matchInfo)]).then(
      axios.spread((data) => {
        if (data.channel) {
          data.channel.then(channel => this.setState({channel: channel.data.name}));
        } else {
          this.setState({
            channel: "Kanal ikke klar",
          });
        }

        if (data.stadium) {
          data.stadium.then(stadium => this.setState({stadium: stadium.data.name}));
        } else {
          this.setState({
            stadium: "Stadion klar",
          });
        }
      }),
    );
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.state.date}</Table.Cell>
        <Table.Cell>{this.state.time}</Table.Cell>
        <Table.Cell>
          {this.state.nextRoundNumber}
. runde
        </Table.Cell>
        <Table.Cell>{this.state.matchInfo.name}</Table.Cell>
        <Table.Cell>{this.state.stadium}</Table.Cell>
        <Table.Cell>{this.state.channel}</Table.Cell>
      </Table.Row>
    );
  }
}

NextMatchInfo.propTypes = {
  matchInfo: PropTypes.object.isRequired,
  nextRoundNumber: PropTypes.number.isRequired,
};

export default NextMatchInfo;
