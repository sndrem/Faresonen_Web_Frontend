import React, { Component } from "react";
import { Segment, Message } from "semantic-ui-react";
import LiveTeaseGenerator from "../LiveTeaseGenerator";
import altOmFotballMatchService from "../../../services/altOmFotballMatchService";
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
      loading: false
    };
    this.service = new FirebaseService();
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getMatches();
    this.getChannels();
  }

  componentWillReceiveProps(props) {
    const { selectedLeague } = props;
    if (selectedLeague) {
      const [id, season] = selectedLeague.split("-");
      this.getMatches(id, season);
    }
  }

  getChannels = () => {
    this.service.getChannels(this.processChannels);
  };

  getMatches = (tournamentId, seasonId) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data
      },
      loading: true
    });
    if (!tournamentId || !seasonId) {
      return;
    }
    altOmFotballMatchService
      .getOnlyNotDoneMatches(tournamentId, seasonId)
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

  handleChange = ({ value, name }) =>
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [name]: value
      }
    });

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
    if (this.state.loading) {
      return <p>Henter kamper...</p>;
    }
    if (matches.length === 0 && !this.state.loading) {
      return (
        <Message info>
          <Message.Header>Info</Message.Header>Ingen kamper tilgjengelig
        </Message>
      );
    }
    return (
      <Segment>
        <LiveTeaseGenerator
          matches={matches}
          defaultChannels={channels}
          allChannels={allChannels}
          handleChange={this.handleChange}
          loading={this.state.loading}
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
