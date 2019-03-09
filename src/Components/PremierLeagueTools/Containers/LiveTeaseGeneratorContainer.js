import React, {Component} from "react";
import PropTypes from "prop-types";
import {Message, Segment} from "semantic-ui-react";
import LiveTeaseGenerator from "../LiveTeaseGenerator";
import LiveTeasePreview from "../LiveTeasePreview";
import badges from "../../../Data/badgePaths";
import altOmFotballMatchService from "../../../services/altOmFotballMatchService";
import FirebaseService from "../../../services/FirebaseService";

class LiveTeaseGeneratorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {match: []},
      selectedMatch: "",
      matchTimeText: "",
      matchTime: "",
      channels: [5, 10],
      allChannels: [],
      colorHome: "",
      colorAway: "",
      colors: [],
      script: "",
      loading: false,
      error: "",
      leagueSelected: {
        tournamentId: "",
        seasonId: ""
      }
    };
    this.service = new FirebaseService();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getLeagues();
    this.getChannels();
    this.getColors();
  }

  UNSAFE_componentWillReceiveProps(props) {
    const {selectedLeague} = props;
    if (selectedLeague) {
      const [id, season] = selectedLeague.split("-");
      this.getLeagues(id, season);
    }
  }

  getColors = () => {
    this.service.getColors(colors => {
      this.setState({colors});
    });
  };

  getLeagues = (tournamentId, seasonId) => {
    if (!tournamentId || !seasonId) {
      return;
    }
    this.setState(prevState => ({
      ...prevState,
      data: {
        ...prevState.data
      },
      loading: true
    }));
    this.getMatches(tournamentId, seasonId);
  };

  getChannels = () => {
    this.service.getChannels(this.processChannels);
  };

  getMatches = (tournamentId, seasonId) => {
    altOmFotballMatchService
      .getOnlyNotDoneMatches(tournamentId, seasonId)
      .then(data => {
        this.setState({
          data: {match: data},
          loading: false,
          error: ""
        });
      })
      .catch(() => {
        this.setState({
          data: {},
          loading: false,
          error:
            "Det var et problem ved henting av kamper. Sjekk at du er koblet til internett"
        });
      });
  };

  getGenerator = (matches, script) => (
    <Segment>
      <LiveTeaseGenerator
        matches={matches}
        handleChange={this.handleChange}
        defaultChannels={this.state.channels}
        loading={this.state.loading}
        colors={this.state.colors}
        allChannels={this.state.allChannels}
      />
      <LiveTeasePreview
        selectedMatch={this.state.selectedMatch}
        matchTimeText={this.state.matchTimeText}
        matchTime={this.state.matchTime}
        channels={this.state.channels}
        allChannels={this.state.allChannels}
        script={script}
        awayColor={this.state.colorAway}
        homeColor={this.state.colorHome}
        findColor={this.findColor}
      />
    </Segment>
  );

  getBadgePath = team => {
    const badgeFound = badges.find(
      badge => badge.team.toLowerCase() === team.toLowerCase()
    );
    if (badgeFound) return badgeFound;
    return {path: "IKKE RIKTIG BADGE"};
    // throw new Error(`Could not find badge for ${team}`);
  };

  getChannelName = channel => {
    const found = this.state.allChannels.find(ch => ch.value === channel);
    if (found) return found.name;
    throw new Error(`Could not find a channel number for ${channel}`);
  };

  getScriptColor = colorKey => this.findColor(this.state[colorKey]).value;

  formatChannels = (formattingChannels, text) => {
    let formattedChannels = [...formattingChannels];
    if (formattingChannels.length === 0) return "INGEN KANALER VALGT";
    // If only one channel is chosen, add a 0 to end of channel list because of how iNews script works
    if (formattedChannels.length === 1) formattedChannels.push(0);

    // If text is not equal to {avspark kl.} then remove all channels, except first, and add 0 to end of channel list
    if (!text.includes("Avspark kl.")) {
      formattedChannels = [formattingChannels[0], 0];
    }
    return formattedChannels.join("\n");
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
${this.getScriptColor("colorHome")}
${awayTeam}
${awayBadge.path}
${this.getScriptColor("colorAway")}
${text.trim()} ${time.trim()}
${this.formatChannels(tvChannels, text.trim())}
PREMIER LEAGUE <00:02-00:15`;
  };

  formatName = name => name.replace("_", "");

  findColor = value => {
    const color = this.state.colors.find(c => c.value === value);
    if (color) return color;
    return {text: "FARGE IKKE FUNNET", hex: "", value: "FARGE IKKE FUNNET"};
  };

  handleChange = ({name, value}) => {
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  processChannels = allChannels => this.setState({allChannels});

  render() {
    if (this.state.loading) {
      return <p>Henter kamper...</p>;
    }
    if (this.state.data.match.length === 0 && !this.state.loading) {
      return (
        <Message info>
          <Message.Header>Info</Message.Header>
          Ingen kamper tilgjengelig
        </Message>
      );
    }
    if (this.state.error) {
      return <Message warning>{this.state.error}</Message>;
    }

    let {match: matches} = this.state.data;
    if (!matches) {
      matches = [];
    }

    const script = this.createScript();
    const generator = this.getGenerator(matches, script);
    return <Segment>{generator}</Segment>;
  }
}
LiveTeaseGeneratorContainer.propTypes = {
  selectedLeague: PropTypes.string.isRequired
};

export default LiveTeaseGeneratorContainer;
