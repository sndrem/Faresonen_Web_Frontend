import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import LiveTeaseGenerator from "../LiveTeaseGenerator";
import altOmFotballMatchService from "../../../services/altOmFotballMatchService";
import leagues from "../../../Data/leagues";
import LiveTeasePreview from "../LiveTeasePreview";
import FirebaseService from "../../../services/FirebaseService";

class ProgramTeaseGeneratorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        matches: [],
        channels: [5],
        allChannels: [],
        matchTimeText: "",
        matchTime: "",
        selectedMatch: ""
      },
      loading: true
    };
    this.service = new FirebaseService();
  }

  componentDidMount() {
    const { tournamentId, seasonId } = leagues.leagues[0];
    if (!tournamentId || !seasonId) {
      console.log(
        `Det er ingen turneringsID eller sesongID tilgjengelig for Premier League`
      );
    }
    this.getMatches(tournamentId, seasonId);
    this.getChannels();
  }

  getChannels = () => {
    this.service.getChannels(this.processChannels);
  };

  setMatchTimeText = matchTimeText =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        matchTimeText
      }
    });

  setTime = matchTime =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        matchTime
      }
    });

  setSelectedMatch = selectedMatch =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        selectedMatch
      }
    });

  setChannels = channels =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        channels
      }
    });

  getMatches = (tournamentId, seasonId) => {
    altOmFotballMatchService
      .getOnlyDoneMatches(tournamentId, seasonId)
      .then(data => {
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            matches: data
          },
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          ...this.state,
          error: "Kunne ikke hente kamper fra AltomFotball",
          loading: false
        });
      });
  };

  createScript = () => {
    const [home, away] = altOmFotballMatchService.splitNames(
      this.state.data.selectedMatch,
      "-"
    );
    const channel = this.state.data.channels[0]
      ? this.state.data.channels[0]
      : "INGEN KANAL VALGT";
    return `Super S18 ${channel}
${this.state.data.matchTimeText || "Tekst ikke valgt"}
${this.state.data.matchTime || "Tid ikke valgt"}
Premier League
${home || "Hjemmelag ikke valgt"} - ${away ||
      "Bortelag ikke valgt"}<00:01-00:15`;
  };

  processChannels = allChannels =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        allChannels
      }
    });

  render() {
    const script = this.createScript();
    const {
      matches,
      channels,
      selectedMatch,
      matchTimeText,
      matchTime,
      allChannels
    } = this.state.data;
    return (
      <Segment>
        <LiveTeaseGenerator
          matches={matches}
          defaultChannels={channels}
          loading={this.state.loading}
          setMatchTimeText={this.setMatchTimeText}
          setTime={this.setTime}
          setSelectedMatch={this.setSelectedMatch}
          setChannels={this.setChannels}
        />
        <LiveTeasePreview
          selectedMatch={selectedMatch}
          matchTimeText={matchTimeText}
          matchTime={matchTime}
          channels={channels}
          allChannels={allChannels}
          script={script}
        />
      </Segment>
    );
  }
}
export default ProgramTeaseGeneratorContainer;
