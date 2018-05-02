import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message, Dropdown } from "semantic-ui-react";
import moment from "moment";
import channels from "../../Data/channels";
import kickOfTexts from "../../Data/kickOfTexts";
import colors from "../../Data/colors";
import "./LiveTeaseGenerator.css";

class LiveTeaseGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels,
      times: [],
      colors
    };
  }

  componentDidMount() {
    this.createTimes();
  }

  handleMatchChange = (event, { value }) => {
    this.props.setSelectedMatch(value);
  };

  handleTimeTextChange = (event, { value }) => {
    this.props.setMatchTimeText(value);
  };

  handleTimeChange = (event, { value }) => this.props.setTime(value);

  handleChannelChange = (event, { value }) => {
    this.props.setChannels(value);
  };

  createTimes = () => {
    const hours = 24;
    const minutes = 15;
    const times = [];
    // eslint-disable-next-line
    for (let i = 0; i < hours; i++) {
      for (let y = 0; y < 60; y += minutes) {
        const time = `${this.formatTime(i)}.${this.formatTime(y)}`;
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

  formatTime = time => (time < 10 ? `0${time}` : time.toString());

  findColor = (colorList, value) => {
    const color = colorList.find(c => c.value === value);
    if (color) return color;
    throw new Error(`Could not find correct color for value ${value}`);
  };

  handleColorChange = (value, home) => {
    const color = this.findColor(colors, value);

    if (home) {
      this.props.setHomeColor(color);
      return;
    }
    this.props.setAwayColor(color);
  };

  mapMatches = matches =>
    matches.map(match => ({
      key: match.name,
      value: match.name,
      text: `${match.name} - ${moment(match.starttime).fromNow()} - ${moment(
        match.starttime
      ).format("DD.MM.YYYY [Kl.] HH:mm")}`
    }));

  render() {
    return (
      <div>
        <Message info>
          Obs obs, pass på og alltid dobbeltsjekke scriptet før du bruker det på
          sending
        </Message>
        <Dropdown
          className="dropdown"
          placeholder="Velg kamp"
          fluid
          search
          selection
          loading={this.props.loading}
          options={this.mapMatches(this.props.matches)}
          onChange={this.handleMatchChange}
        />
        <Dropdown
          className="dropdown"
          placeholder="Velg avsparkstekst"
          search
          selection
          options={kickOfTexts}
          onChange={this.handleTimeTextChange}
        />
        <Dropdown
          className="dropdown"
          placeholder="Velg klokkeslett"
          search
          selection
          options={this.state.times}
          onChange={this.handleTimeChange}
        />
        <Dropdown
          className="dropdown"
          placeholder="Velg farge hjemmelag"
          search
          selection
          options={this.state.colors}
          onChange={(event, { value }) => this.handleColorChange(value, true)}
        />

        <Dropdown
          className="dropdown"
          placeholder="Velg farge bortelag"
          search
          options={this.state.colors}
          selection
          onChange={(event, { value }) => this.handleColorChange(value, false)}
        />
        <Dropdown
          className="dropdown"
          placeholder="Velg kanal"
          fluid
          search
          selection
          multiple
          defaultValue={this.props.defaultChannels}
          onChange={this.handleChannelChange}
          options={this.state.channels}
        />
      </div>
    );
  }
}

LiveTeaseGenerator.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      starttime: PropTypes.string.isRequired
    })
  ).isRequired,
  setMatchTimeText: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  setSelectedMatch: PropTypes.func.isRequired,
  setChannels: PropTypes.func.isRequired,
  defaultChannels: PropTypes.arrayOf(PropTypes.string).isRequired,
  setHomeColor: PropTypes.func,
  setAwayColor: PropTypes.func,
  loading: PropTypes.bool.isRequired
};

LiveTeaseGenerator.defaultProps = {
  error: "",
  setHomeColor: () => {},
  setAwayColor: () => {}
};

export default LiveTeaseGenerator;
