import React, { Component } from "react";
import PropTypes from "prop-types";
import { Message, Dropdown } from "semantic-ui-react";
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

  createColorItems = (colorElements, home) =>
    colorElements.map(color => {
      const changeColor = this.handleColorChange(color, home);
      return (
        <Dropdown.Item
          key={color.value}
          style={{ background: color.hex }}
          value={color.value}
          text={color.text}
          onClick={() => changeColor(color)}
        />
      );
    });

  handleColorChange = (color, home) => {
    if (home) return this.handleColorChangeHome;

    return this.handleColorChangeAway;
  };

  handleColorChangeHome = homeColor => this.props.setHomeColor(homeColor);
  handleColorChangeAway = awayColor => this.props.setAwayColor(awayColor);

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
          options={this.props.matches}
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
        >
          <Dropdown.Menu>
            {this.createColorItems(this.state.colors, true)}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="dropdown" placeholder="Velg farge bortelag" search>
          <Dropdown.Menu>
            {this.createColorItems(this.state.colors, false)}
          </Dropdown.Menu>
        </Dropdown>
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
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  setMatchTimeText: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  setSelectedMatch: PropTypes.func.isRequired,
  setChannels: PropTypes.func.isRequired,
  defaultChannels: PropTypes.arrayOf(PropTypes.string).isRequired,
  setHomeColor: PropTypes.func.isRequired,
  setAwayColor: PropTypes.func.isRequired
};

LiveTeaseGenerator.defaultProps = {
  error: ""
};

export default LiveTeaseGenerator;
