import React, {Component} from "react";
import {Divider, Message} from "semantic-ui-react";
import axios from "axios";
import PropTypes from "prop-types";
import goalEvents from "../../Tools/events";

class FinishedMatchElements extends Component {
  static goalWasGoalInPlay(event) {
    return goalEvents.goalInPlay.includes(event);
  }

  static goalWasPenalty(event) {
    return goalEvents.penaltyGoal.includes(event);
  }

  static goalWasOwnGoal(event) {
    return goalEvents.ownGoal.includes(event);
  }

  static calculateHomeAndAwayEvents(events) {
    return events.reduce(
      (obj, e, index, list) => {
        const prevElementA = list[index - 1] === undefined ? null : list[index - 1].goalsTeamA;
        const prevElementB = list[index - 1] === undefined ? null : list[index - 1].goalsTeamB;

        const previousHomeScore = prevElementA === null ? 0 : parseInt(prevElementA, 10);
        const previousAwayScore = prevElementB === null ? 0 : parseInt(prevElementB, 10);

        const homeScore = parseInt(e.goalsTeamA, 10);
        const awayScore = parseInt(e.goalsTeamB, 10);

        if (homeScore > previousHomeScore) {
          obj.home.push(e);
        }

        if (awayScore > previousAwayScore) {
          obj.away.push(e);
        }

        return obj;
      },
      {home: [], away: []},
    );
  }

  static filterGoalEvents(events) {
    return events.filter((e) => {
      const eventType = e.eventtype["@uri"];
      const extendedEventType = e.extendedeventtype["@uri"];
      if (!eventType) return false;
      if (!extendedEventType) return false;
      return (
        FinishedMatchElements.goalWasGoalInPlay(eventType)
        || FinishedMatchElements.goalWasPenalty(eventType)
        || FinishedMatchElements.goalWasPenalty(extendedEventType)
        || FinishedMatchElements.goalWasOwnGoal(extendedEventType)
      );
    });
  }

  static getNameOfPerson(uri) {
    return axios.get(uri);
  }

  static splitGameName(name) {
    if (name.includes("-")) {
      return name.split("-");
    } if (name.includes(",")) {
      return name.split(",");
    } if (name.includes(";")) {
      return name.split(";");
    }
    return name;
  }

  static groupScorers(scorers) {
    return scorers.reduce((obj, scorer) => {
      if (!obj[scorer.person1["@uri"]]) {
        // eslint-disable-next-line no-param-reassign
        obj[scorer.person1["@uri"]] = [];
        obj[scorer.person1["@uri"]].push({
          firstname: scorer.person1.firstname,
          lastname: scorer.person1.lastname,
          eventTime: scorer.eventtime,
          eventType: scorer.eventtype["@uri"],
          extendedeventtype: scorer.extendedeventtype["@uri"],
        });
      } else {
        obj[scorer.person1["@uri"]].push({
          firstname: scorer.person1.firstname,
          lastname: scorer.person1.lastname,
          eventTime: scorer.eventtime,
          eventType: scorer.eventtype["@uri"],
          extendedeventtype: scorer.extendedeventtype["@uri"],
        });
      }
      return obj;
    }, {});
  }

  static formatIndividualGoalScorer(scorer) {
    let text = `${scorer[0].lastname} (`;
    scorer.forEach((s, index, list) => {
      const extendedEventType = s.extendedeventtype;
      const eventType = s.eventType;
      if (
        FinishedMatchElements.goalWasPenalty(extendedEventType)
        || FinishedMatchElements.goalWasPenalty(eventType)
      ) {
        text += "str. ";
      } else if (FinishedMatchElements.goalWasOwnGoal(extendedEventType)) {
        text += "sm. ";
      }
      text += index + 1 !== list.length ? `${s.eventTime}, ` : `${s.eventTime}`;
    });
    text += ")";
    return text;
  }

  static formatGoalScoreText(scorers) {
    const groupedScorers = FinishedMatchElements.groupScorers(scorers);
    return Object.keys(groupedScorers)
      .map(key => FinishedMatchElements.formatIndividualGoalScorer(groupedScorers[key]))
      .join(", ");
  }

  static extractPersonNames(events) {
    return new Promise((resolve) => {
      const promises = [];
      events.forEach((e) => {
        promises.push(FinishedMatchElements.getNameOfPerson(e.person1["@uri"]));
      });

      axios.all(promises).then((data) => {
        events.forEach((e, index) => {
          e.person1 = data[index].data;
        });
        resolve(events);
      });
    });
  }

  constructor(props) {
    super(props);
    const [home, away] = FinishedMatchElements.splitGameName(
      props.matchInfo.name,
    );
    this.state = {
      home,
      away,
      goalScorersHomeTeam: [],
      goalScorersAwayTeam: [],
    };
  }

  componentDidMount() {
    this.getGoals(this.props.matchInfo.events["@uri"]);
  }

  getGoals(eventUri) {
    axios
      .get(eventUri)
      .then((data) => {
        const filteredGoalEvents = FinishedMatchElements.filterGoalEvents(
          data.data.event,
        );
        const calculatedEvents = FinishedMatchElements.calculateHomeAndAwayEvents(
          filteredGoalEvents,
        );
        FinishedMatchElements.extractPersonNames(calculatedEvents.home).then(
          (goalScorersHomeTeam) => {
            this.setState({
              goalScorersHomeTeam,
            });
          },
        );
        FinishedMatchElements.extractPersonNames(calculatedEvents.away).then(
          (goalScorersAwayTeam) => {
            this.setState({
              goalScorersAwayTeam,
            });
          },
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const {home, away} = this.state;
    const homeScorers = FinishedMatchElements.formatGoalScoreText(
      this.state.goalScorersHomeTeam,
    );
    const awayScorers = FinishedMatchElements.formatGoalScoreText(
      this.state.goalScorersAwayTeam,
    );

    return (
      <div>
        <Message size="small">
          <Message.Header>
            {home}
            {" "}
            {this.props.matchInfo.goalsTeamAEndtime}
            {" "}
-
            {" "}
            {this.props.matchInfo.goalsTeamBEndtime}
            {" "}
            {away}
          </Message.Header>
          {this.props.matchInfo.goalsTeamAEndtime > 0 ? (
            <p>
              <b>
                {home}
:
              </b>
              {" "}
              {homeScorers}
            </p>
          ) : (
            ""
          )}
          {this.props.matchInfo.goalsTeamBEndtime > 0 ? (
            <p>
              <b>{away}</b>
:
              {awayScorers}
            </p>
          ) : (
            ""
          )}
        </Message>
        <Divider />
      </div>
    );
  }
}

FinishedMatchElements.propTypes = {
  matchInfo: PropTypes.shape({
    goalsTeamAEndtime: PropTypes.string.isRequired,
    goalsTeamBEndtime: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    events: PropTypes.shape({
      "@uri": PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FinishedMatchElements;
