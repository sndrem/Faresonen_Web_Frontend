import React, {Component} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";
import MatchInfo from "../MatchInfo";
import tools from "../../../Tools/tools";

class MatchInfoContainer extends Component {
  static formatRefereeName(ref) {
    if (ref.firstname && ref.lastname) {
      return `${ref.firstname} ${ref.lastname}`.trim();
    } if (ref.firstname) {
      return `${ref.firstname}`.trim();
    } if (ref.lastname) {
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
      startDate: moment(props.match.starttime, "YYYY-MM-DDTHH:mm:ssZZ").format(
        "DD/MM YYYY",
      ),
      startTime: tools.getTime(props.match.starttime),
      referee: "",
      status: props.match.status,
    };
  }

  componentDidMount() {
    if (this.props.match.referee) {
      this.getReferee(this.props.match.referee["@uri"]);
    }
    axios.all([tools.getChannelAndStadium(this.props.match)]).then(
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
            stadium: "Stadion ikke klar",
          });
        }
      }),
    );
  }

  getReferee(refUri) {
    axios.get(refUri).then((data) => {
      this.setState({
        referee: MatchInfoContainer.formatRefereeName(data.data),
      });
    });
  }

  render() {
    return (
      <MatchInfo
        status={this.state.status}
        matchName={this.state.matchName}
        channel={this.state.channel}
        stadium={this.state.channel}
        startDate={this.state.startDate}
        startTime={this.state.startTime}
        referee={this.state.referee}
      />
    );
    // let header = "";
    // const { status } = this.props.match;
    // if (status && events.postponed.includes(status["@uri"])) {
    //   header = (
    //     <Item.Header>
    //       UTSATT: {this.state.matchName}, {this.state.stadium}
    //     </Item.Header>
    //   );
    // } else {
    //   header = (
    //     <Item.Header>
    //       {this.state.matchName}, {this.state.stadium}
    //     </Item.Header>
    //   );
    // }
    // return (
    //   <Item>
    //     <Item.Content>
    //       {header}
    //       <Item.Meta>
    //         {this.state.startDate} - Avspark kl. {this.state.startTime} på{" "}
    //         {this.state.channel}
    //       </Item.Meta>
    //       {this.state.referee && (
    //         <Item.Meta className="float-right">
    //           Dommer: {this.state.referee}
    //         </Item.Meta>
    //       )}
    //     </Item.Content>
    //   </Item>
    // );
  }
}

MatchInfoContainer.propTypes = {
  match: PropTypes.shape({
    name: PropTypes.string.isRequired,
    starttime: PropTypes.string.isRequired,
    referee: PropTypes.shape({"@uri": PropTypes.string.isRequired}),
    status: PropTypes.shape({"@uri": PropTypes.string.isRequired}),
  }).isRequired,
};
export default MatchInfoContainer;
