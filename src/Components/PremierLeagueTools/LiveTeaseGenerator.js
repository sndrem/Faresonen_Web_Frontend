import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message, Dropdown } from "semantic-ui-react";
import channels from "../../Data/channels";
import kickOfTexts from "../../Data/kickOfTexts";

class LiveTeaseGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels,
      times: []
    };
  }

  componentDidMount() {
    this.createTimes();
  }

  handleMatchChange = (event, { value }) => {
    this.props.setSelectedMatch(value);
  };

  handleTimeTextChange = (event, { value }) =>
    this.props.setMatchTimeText(value);
  handleTimeChange = (event, { value }) => this.props.setTime(value);
  handleChannelChange = (event, { value }) => {
    this.props.setChannels(value);
  };

  createTimes = () => {
    const hours = 24;
    const minutes = 15;
    const times = [];
    for (let i = 0; i < hours; i++) {
      for (let y = 0; y < 60; y += minutes) {
        const time = `${this.formatHours(i)}.${this.formatMinutes(y)}`;
        times.push({
          key: time,
          value: time,
          text: time
        });
      }
    }
    this.setState({
      ...this.state,
      times
    });
  };

  formatHours = hour => (hour < 10 ? `0${hour}` : hour);
  formatMinutes = mins => (mins < 10 ? `0${mins}` : mins);

  render() {
    return (
      <div>
        <Message info>
          Obs obs, pass på og alltid dobbeltsjekke scriptet før du bruker det på
          sending
        </Message>
        <Dropdown
          placeholder="Velg kamp"
          fluid
          search
          selection
          options={this.props.matches}
          onChange={this.handleMatchChange}
        />
        <Dropdown
          placeholder="Velg avsparkstekst"
          search
          selection
          options={kickOfTexts}
          onChange={this.handleTimeTextChange}
        />
        <Dropdown
          placeholder="Velg klokkeslett"
          search
          selection
          options={this.state.times}
          onChange={this.handleTimeChange}
        />

        <Dropdown
          placeholder="Velg kanal"
          fluid
          search
          selection
          multiple
          defaultValue={this.props.defaultChannels}
          onChange={this.handleChannelChange}
          options={channels}
        />
      </div>
    );
  }
}

LiveTeaseGenerator.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  setMatchTimeText: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  setSelectedMatch: PropTypes.func.isRequired,
  setChannels: PropTypes.func.isRequired,
  defaultChannels: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default LiveTeaseGenerator;
