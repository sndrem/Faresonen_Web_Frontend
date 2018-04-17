import React, { Component } from "react";
import axios from "axios";
import { Message, Segment, Dimmer, Loader } from "semantic-ui-react";
import moment from "moment";
import LiveTeaseGenerator from "../LiveTeaseGenerator";
import LiveTeasePreview from "../LiveTeasePreview";
import leagues from "../../../Data/leagues";
import badges from "../../../Data/badgePaths";
import channels from "../../../Data/channels";

class PremierLeagueToolsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      selectedMatch: "",
      matchTimeText: "",
      matchTime: "",
      channels: ["TV 2 Sport Premium", "TV 2 Sumo"],
      script: "",
      loading: true,
      copied: false,
      error: ""
    };
  }

  componentDidMount() {
    const { tournamentId, seasonId } = leagues.leagues[2];
    if (!tournamentId || !seasonId) {
      console.log(
        `Det er ingen turneringsID eller sesongID tilgjengelig for Premier League`
      );
      this.setState({
        error: `Det er ingen turneringsID eller sesongID tilgjengelig for Premier League`,
        loading: false
      });
    }
    this.getMatches(tournamentId, seasonId);
  }

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

  setChannels = channels =>
    this.setState({
      ...this.state,
      channels
    });

  mapMatches = matches =>
    matches.map(match => ({
      key: match.name,
      value: match.name,
      text: `${match.name} - ${moment(match.starttime).fromNow()} - ${moment(
        match.starttime
      ).format("DD.MM.YYYY [Kl.] HH:mm")}`
    }));

  getBadgePath = team => {
    return badges.find(
      badge => badge.team.toLowerCase() === team.toLowerCase()
    );
  };

  getChannelNumber = channel => {
    const found = channels.find(
      ch => ch.name.toLowerCase() === channel.toLowerCase()
    );
    if (found) return found.number;
    throw new Error(`Could not find a channel number for ${channel}`);
  };

  filterDoneMatches = matches =>
    matches.filter(match => match.confirmed !== "true");

  formatName = name => name.replace("_", "");

  formatChannels = formattingChannels => {
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
${channelNumbers[1]}`.trim();
    }
    this.setState({
      error: "Du kan kun velge to kanaler. Fjern de overflødige"
    });
  };

  createScript = (match, text, time, tvChannels) => {
    if (!match) return "";

    if (match.split("-").length < 2) return "";
    const teams = match.split("-");
    const homeTeam = this.formatName(teams[0]);
    const awayTeam = this.formatName(teams[1]);
    const homeBadge = this.getBadgePath(homeTeam);
    const awayBadge = this.getBadgePath(awayTeam);

    return `*SUPER Kamp_Promo_v2 ${homeTeam}
${homeBadge.path}
0
${awayTeam}
${awayBadge.path}
0
${text.trim()} ${time.trim()}
${this.formatChannels(tvChannels)}
PREMIER LEAGUE <00:02-00:15
`;
  };

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

    const { selectedMatch, matchTimeText, matchTime, channels } = this.state;
    const script = this.createScript(
      selectedMatch,
      matchTimeText,
      matchTime,
      channels
    );
    return (
      <div>
        <Segment>
          <Dimmer active={this.state.loading}>
            <Loader>henter kamper</Loader>
          </Dimmer>
          <LiveTeaseGenerator
            matches={filtered}
            setSelectedMatch={this.setSelectedMatch}
            setMatchTimeText={this.setMatchTimeText}
            setTime={this.setMatchTime}
            setChannels={this.setChannels}
            defaultChannels={this.state.channels}
          />
        </Segment>
        <LiveTeasePreview
          selectedMatch={this.state.selectedMatch}
          matchTimeText={this.state.matchTimeText}
          matchTime={this.state.matchTime}
          channels={this.state.channels}
          script={script}
        />
      </div>
    );
  }
}
export default PremierLeagueToolsContainer;
