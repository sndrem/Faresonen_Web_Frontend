import React, { Component } from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";
import FinishedMatchElements from "./FinishedMatchElements";

class FinishedMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: this.props.matches
    };
  }

  componentDidMount() {}

  render() {
    const finishedMatchElements = this.state.matches.map(m => (
      <FinishedMatchElements key={m.id} matchInfo={m} />
    ));

    return (
      <Segment>
        <Dimmer active={this.state.loading}>
          <Loader>Henter kamper som er ferdig</Loader>
        </Dimmer>
        <h1>Ferdig spilt i runde {this.props.roundNumber}</h1>
        {finishedMatchElements}
      </Segment>
    );
  }
}

FinishedMatches.propTypes = {
  matches: PropTypes.array.isRequired,
  roundNumber: PropTypes.number.isRequired
};

export default FinishedMatches;
