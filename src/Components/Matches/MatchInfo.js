import React, { Component } from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import "moment/locale/nb";
import tools from "../../Tools/tools";
import events from "../../Tools/events";

class MatchInfo extends Component {
  static formatRefereeName(ref) {
    if (ref.firstname && ref.lastname) {
      return `${ref.firstname} ${ref.lastname}`.trim();
    } else if (ref.firstname) {
      return `${ref.firstname}`.trim();
    } else if (ref.lastname) {
      return `${ref.lastname}`.trim();
    }
    throw new Error("Referee must have either firstname or lastname property");
  }

  constructor(props) {
    super(props);
    this.state = {
      matchName: props.match.name,
      channel: "",
      stadium: "",
      startDate: moment(props.match.starttime).format("DD/MM YYYY"),
      startTime: tools.getTime(props.match.starttime),
      referee: ""
    };
  }

  componentDidMount() {
    if (this.props.match.referee) {
      this.getReferee(this.props.match.referee["@uri"]);
    }
    axios.all([tools.getChannelAndStadium(this.props.match)]).then(
      axios.spread(data => {
        if (data.channel) {
          data.channel.then(channel =>
            this.setState({ channel: channel.data.name })
          );
        } else {
          this.setState({
            channel: "Kanal ikke klar"
          });
        }

        if (data.stadium) {
          data.stadium.then(stadium =>
            this.setState({ stadium: stadium.data.name })
          );
        } else {
          this.setState({
            stadium: "Stadion klar"
          });
        }
      })
    );
  }

  getReferee(refUri) {
    axios.get(refUri).then(data => {
      this.setState({
        referee: MatchInfo.formatRefereeName(data.data)
      });
    });
  }

  render() {
    let header = "";
    const { status } = this.props.match;
    if (status && events.postponed.includes(status["@uri"])) {
      header = (
        <Item.Header>
          UTSATT: {this.state.matchName}, {this.state.stadium}
        </Item.Header>
      );
    } else {
      header = (
        <Item.Header>
          {this.state.matchName}, {this.state.stadium}
        </Item.Header>
      );
    }
    return (
      <Item>
        <Item.Content>
          {header}
          <Item.Meta>
            {this.state.startDate} - Avspark kl. {this.state.startTime} på{" "}
            {this.state.channel}
          </Item.Meta>
          {this.state.referee && (
            <Item.Meta className="float-right">
              Dommer: {this.state.referee}
            </Item.Meta>
          )}
        </Item.Content>
      </Item>
    );
  }
}

MatchInfo.propTypes = {
  match: PropTypes.shape({
    name: PropTypes.string.isRequired,
    starttime: PropTypes.string.isRequired,
    referee: PropTypes.shape({ "@uri": PropTypes.string.isRequired }),
    status: PropTypes.shape({ "@uri": PropTypes.string.isRequired })
  }).isRequired
};

export default MatchInfo;
