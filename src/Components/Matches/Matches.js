import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, Divider, Segment, Dimmer, Loader } from "semantic-ui-react";
import MatchInfo from "./MatchInfo";
import events from "../../Tools/events";
import "./Matches.css";

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      matches: nextProps.matches,
      loading: false
    });
  }

  render() {
    const nextMatches = this.state.matches.map(m => {
      let className = "";

      if (m.status && events.postponed.includes(m.status["@uri"])) {
        className = "postponed no-print";
      } else if (!!m.confirmed === true) {
        className = "finished no-print";
      }
      return (
        <List.Item className={className} key={m.id}>
          <MatchInfo match={m} />
          <Divider />
        </List.Item>
      );
    });
    return (
      <Segment className="print" padded={"very"}>
        <Dimmer size={"medium"} active={this.state.loading}>
          <Loader>Henter kamper</Loader>
        </Dimmer>
        <h1>
          {this.props.leagueName} - {this.props.roundNumber}. Runde
        </h1>
        <List>{nextMatches}</List>
      </Segment>
    );
  }
}

Matches.propTypes = {
  leagueName: PropTypes.string.isRequired,
  roundNumber: PropTypes.number.isRequired,
  matches: PropTypes.array.isRequired
};

export default Matches;
