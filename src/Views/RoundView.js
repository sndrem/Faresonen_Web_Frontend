import React, {Component} from "react";
import PropTypes from "prop-types";
import {Message} from "semantic-ui-react";
import axios from "axios";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import LeagueProgress from "../Components/LeagueProgress/LeagueProgress";
import NextMatches from "../Components/NextMatches/NextMatches";
import FinishedMatches from "../Components/Matches/FinishedMatches";
import LeagueTable from "../Components/LeagueTable/LeagueTable";
import TopscorersContainer from "../Components/Topscorers/Containers/TopscorersContainer";
import RoundSteps from "../Components/ProcedureSteps/RoundSteps";
import DangerzoneContainer from "../Components/Dangerzone/Containers/DangerzoneContainer";
import tools from "../Tools/tools";
import "../print.css";
import MatchesContainer from "../Components/Dangerzone/Containers/MatchesContainer";

class RoundView extends Component {
  static filterFinishedMatches(matches) {
    return matches
      .filter(m => !!m.confirmed === true)
      .sort((a, b) => a.starttime >= b.starttime);
  }

  constructor(props) {
    super(props);
    const {
      match: {
        params: {leagueName, roundNumber, tournamentId, seasonId}
      }
    } = this.props;
    this.state = {
      leagueName,
      roundNumber: parseInt(roundNumber, 10),
      tournamentId: parseInt(tournamentId, 10),
      seasonId: parseInt(seasonId, 10),
      matches: [],
      nextMatches: [],
      finishedMatches: [],
      table: [],
      loading: true
    };
  }

  componentDidMount() {
    let {
      match: {
        params: {roundId, nextRoundId}
      }
    } = this.props;
    const {
      match: {
        params: {tournamentId, seasonId}
      }
    } = this.props;
    roundId = parseInt(roundId, 10);
    nextRoundId = parseInt(nextRoundId, 10);
    this.getRound(roundId, "matches");
    this.getTable(tournamentId, seasonId);
    if (nextRoundId > 0) {
      this.getRound(nextRoundId, "nextMatches");
    }
  }

  getTable(tournamentId, seasonId) {
    axios
      .get(`/table/${tournamentId}/${seasonId}`)
      .then(data => {
        this.setState({table: data.data.item});
      })
      .catch(() => this.setState({table: []}));
  }

  getRound = (roundId, key) => {
    axios
      .get(`/rounds/${roundId}`)
      .then(data => {
        let matches = [];
        matches = data.data.match.sort((a, b) => a.starttime >= b.starttime);

        let finishedMatches = [];
        finishedMatches = RoundView.filterFinishedMatches(matches);
        if (key === "matches") {
          this.setState({
            [key]: matches,
            finishedMatches,
            loading: false
          });
        } else {
          this.setState({
            [key]: matches,
            loading: false
          });
        }
      })
      .catch(() =>
        this.setState({
          [key]: [],
          finishedMatches: [],
          loading: false
        })
      );
  };

  render() {
    let finishedMatchesElement = null;
    const {
      finishedMatches,
      loading,
      roundNumber,
      leagueName,
      tournamentId,
      seasonId,
      matches,
      nextMatches,
      table
    } = this.state;
    const {switchLeagueName} = this.props;
    if (finishedMatches.length > 0 && !loading) {
      finishedMatchesElement = (
        <FinishedMatches
          className="print"
          matches={finishedMatches}
          roundNumber={roundNumber}
        />
      );
    } else {
      finishedMatchesElement = (
        <Message className="no-print" info>
          <Message.Header>Ferdig spilte kamper</Message.Header>
          Det er ikke spilt noen kamper denne runden
        </Message>
      );
    }

    return (
      <div>
        <FaresoneMenu switchLeagueName={switchLeagueName} />

        <RoundSteps
          className="no-print"
          round={roundNumber}
          league={leagueName}
        />

        <LeagueProgress
          leagueName={leagueName}
          tournamentId={tournamentId}
          seasonId={seasonId}
        />

        <MatchesContainer
          className="print"
          leagueName={leagueName}
          roundNumber={roundNumber}
          matches={matches}
          loading={loading}
        />

        {finishedMatchesElement}

        <LeagueTable
          className="print"
          leagueName={leagueName}
          table={table}
          tableColors={tools.getTableColors(tournamentId)}
        />

        <NextMatches
          className="print"
          matches={nextMatches}
          nextRoundNumber={roundNumber}
          loading={loading}
        />

        <TopscorersContainer className="print" tournamentId={tournamentId} />

        <DangerzoneContainer
          className="print"
          leagueName={leagueName}
          tournamentId={parseInt(tournamentId, 10)}
        />
      </div>
    );
  }
}

RoundView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  switchLeagueName: PropTypes.func.isRequired
};

export default RoundView;
