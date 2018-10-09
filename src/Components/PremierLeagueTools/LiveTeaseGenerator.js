import React, {Component} from "react";
import PropTypes from "prop-types";
import {Message, Dropdown} from "semantic-ui-react";
import moment from "moment-timezone";
import kickOfTexts from "../../Data/kickOfTexts";
import "./LiveTeaseGenerator.css";

class LiveTeaseGenerator extends Component {
  componentDidMount() {
    this.createTimes();
  }

  handleChange = (event, props) => this.props.handleChange(props);

  createTimes = () => {
    const hours = 24;
    const minutes = 15;
    const times = [];
    // eslint-disable-next-line
    for (let i = 0; i < hours; i++) {
      for (let y = 0; y < 60; y += minutes) {
        const time = `${this.padTime(i)}.${this.padTime(y)}`;
        times.push({
          key: time,
          value: time,
          text: time
        });
      }
    }
    return times;
  };

  padTime = time => (time < 10 ? `0${time}` : time.toString());

  mapMatches = matches => {
    moment.tz.setDefault("Europe/Oslo");

    return matches.map(match => ({
      key: match["@uri"],
      value: match.name,
      text: `${match.name} - ${moment(match.starttime).from(
        moment()
      )} - ${moment(match.starttime).format("DD.MM.YYYY [Kl.] HH:mm")}`
    }));
  };

  mapChannels = channels =>
    channels.map(channel => ({
      key: channel.value,
      value: parseInt(channel.value, 10),
      text: channel.name
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
          onChange={this.handleChange}
          name="selectedMatch"
        />
        <Dropdown
          className="dropdown"
          placeholder="Velg avsparkstekst"
          search
          selection
          options={kickOfTexts}
          onChange={this.handleChange}
          name="matchTimeText"
        />
        <Dropdown
          className="dropdown"
          placeholder="Velg klokkeslett"
          search
          selection
          options={this.createTimes()}
          onChange={this.handleChange}
          name="matchTime"
        />
        {this.props.colors.length > 0 ? (
          <div>
            <Dropdown
              className="dropdown"
              placeholder="Velg farge hjemmelag"
              search
              selection
              options={this.props.colors}
              onChange={this.handleChange}
              name="colorHome"
            />

            <Dropdown
              className="dropdown"
              placeholder="Velg farge bortelag"
              search
              options={this.props.colors}
              selection
              onChange={this.handleChange}
              name="colorAway"
            />
          </div>
        ) : (
          ""
        )}
        <Dropdown
          className="dropdown"
          placeholder="Velg kanal"
          fluid
          search
          selection
          multiple
          defaultValue={this.props.defaultChannels}
          onChange={this.handleChange}
          options={this.mapChannels(this.props.allChannels)}
          name="channels"
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
  handleChange: PropTypes.func.isRequired,
  defaultChannels: PropTypes.arrayOf(PropTypes.number).isRequired,
  allChannels: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      hex: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
};

LiveTeaseGenerator.defaultProps = {
  colors: []
};

export default LiveTeaseGenerator;
