import React, { Component } from "react";
import axios from "axios";
import { Message, Segment, Menu } from "semantic-ui-react";
import moment from "moment";
import LiveTeaseGenerator from "../LiveTeaseGenerator";
import LiveTeasePreview from "../LiveTeasePreview";
import leagues from "../../../Data/leagues";
import badges from "../../../Data/badgePaths";
import channels from "../../../Data/channels";
import colors from "../../../Data/colors";

class PremierLeagueToolsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      selectedMatch: "",
      matchTimeText: "",
      matchTime: "",
      channels: ["TV 2 Sport Premium", "TV 2 Sumo"],
      colorHome: colors[0],
      colorAway: colors[2],
      script: "",
      loading: true,
      copied: false,
      error: "",
      activeItem: "liveinfo"
    };
  }

  componentDidMount() {
    const { tournamentId, seasonId } = leagues.leagues[2];
    if (!tournamentId || !seasonId) {
      console.log(
        `Det er ingen turneringsID eller sesongID tilgjengelig for Premier League`
      );
      this.setErrorLoadingState();
    }
    this.getMatches(tournamentId, seasonId);
  }

  setErrorLoadingState = () =>
    this.setState({
      error: `Det er ingen turneringsID eller sesongID tilgjengelig for Premier League`,
      loading: false
    });

  getMatches = (tournamentId, seasonId) => {
    axios
      .get(`/matches/${tournamentId}/${seasonId}`)
      .then(data => {
        this.setState({
          data: data.data,
          loading: false,
          error: ""
        });
      })
      .catch(err => {
        console.warn(err);
        this.setState({
          data: {},
          loading: false,
          error:
            "Det var et problem ved henting av kamper. Sjekk at du er koblet til internett"
        });
      });
  };

  setSelectedMatch = match => {
    this.setState({
      ...this.state,
      selectedMatch: match
    });
  };

  setMatchTimeText = matchTimeText => {
    this.setState({
      ...this.state,
      matchTimeText
    });
  };

  setMatchTime = matchTime => {
    this.setState({
      ...this.state,
      matchTime
    });
  };

  setChannels = setChannels =>
    this.setState({
      ...this.state,
      channels: setChannels
    });

  setHomeColor = colorHome => {
    this.setState({
      ...this.state,
      colorHome
    });
  };

  setAwayColor = colorAway => {
    this.setState({
      ...this.state,
      colorAway
    });
  };

  getBadgePath = team =>
    badges.find(badge => badge.team.toLowerCase() === team.toLowerCase());

  getChannelNumber = channel => {
    const found = channels.find(
      ch => ch.name.toLowerCase() === channel.toLowerCase()
    );
    if (found) return found.number;
    throw new Error(`Could not find a channel number for ${channel}`);
  };

  mapMatches = matches =>
    matches.map(match => ({
      key: match.name,
      value: match.name,
      text: `${match.name} - ${moment(match.starttime).fromNow()} - ${moment(
        match.starttime
      ).format("DD.MM.YYYY [Kl.] HH:mm")}`
    }));

  filterDoneMatches = matches =>
    matches.filter(match => match.confirmed !== "true");

  formatName = name => name.replace("_", "");

  formatChannels = (formattingChannels, text) => {
    const channelNumbers = formattingChannels.map(ch =>
      this.getChannelNumber(ch)
    );
    if (channelNumbers.length === 0) {
      return "INGEN KANALER VALGT";
    } else if (channelNumbers.length === 1) {
      return `${channelNumbers[0]}
0`;
    } else if (channelNumbers.length === 2) {
      return `
${channelNumbers[0]}
${text.trim() !== "Avspark kl." ? 0 : channelNumbers[1]}`.trim();
    }
    this.setState({
      error: "Du kan kun velge to kanaler. Fjern de overflødige"
    });
  };

  createScript = () => {
    const {
      selectedMatch: match,
      matchTimeText: text,
      matchTime: time,
      channels: tvChannels
    } = this.state;
    if (!match) return "";

    // TODO Refactor this check for if we can split the match string in two pieces
    if (match.split("-").length < 2) return match;
    const teams = match.split("-");
    const homeTeam = this.formatName(teams[0]);
    const awayTeam = this.formatName(teams[1]);
    const homeBadge = this.getBadgePath(homeTeam);
    const awayBadge = this.getBadgePath(awayTeam);

    return `*SUPER Kamp_Promo_v2 ${homeTeam}
${homeBadge.path}
${this.state.colorHome.value}
${awayTeam}
${awayBadge.path}
${this.state.colorAway.value}
${text.trim()} ${time.trim()}
${this.formatChannels(tvChannels, text.trim())}
PREMIER LEAGUE <00:02-00:15
`;
  };

  handleItemClick = (event, props) => {
    this.setState({
      ...this.state,
      activeItem: props.name.toLowerCase()
    });
  };

  getGenerator(name, matches, script) {
    return (
      <Segment>
        <LiveTeaseGenerator
          matches={matches}
          setSelectedMatch={this.setSelectedMatch}
          setMatchTimeText={this.setMatchTimeText}
          setTime={this.setMatchTime}
          setChannels={this.setChannels}
          defaultChannels={this.state.channels}
          setHomeColor={this.setHomeColor}
          setAwayColor={this.setAwayColor}
          loading={this.state.loading}
        />
        <LiveTeasePreview
          selectedMatch={this.state.selectedMatch}
          matchTimeText={this.state.matchTimeText}
          matchTime={this.state.matchTime}
          channels={this.state.channels}
          script={script}
          homeColor={this.state.colorHome}
          awayColor={this.state.colorAway}
        />
      </Segment>
    );
  }

  render() {
    if (this.state.error) {
      return <Message warning>{this.state.error}</Message>;
    }

    let { match } = this.state.data;
    if (!match) {
      match = [];
    }
    let filtered = this.filterDoneMatches(match);
    filtered = this.mapMatches(filtered);

    const { activeItem } = this.state;
    const script = this.createScript();
    const generator = this.getGenerator(activeItem, filtered, script);
    return (
      <div>
        <Segment>
          <Menu>
            <Menu.Item
              name="liveinfo"
              active={activeItem === "liveinfo"}
              onClick={this.handleItemClick}
              link
            >
              Liveinfo
            </Menu.Item>

            <Menu.Item
              name="S18 - Teasesuper"
              active={activeItem === "S18 - Teasesuper"}
              onClick={this.handleItemClick}
              link
            >
              S18 - Teasesuper
            </Menu.Item>
          </Menu>
        </Segment>

        <Segment>{generator}</Segment>
      </div>
    );
  }
}
export default PremierLeagueToolsContainer;
