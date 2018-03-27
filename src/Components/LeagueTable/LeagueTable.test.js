import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import axios from "axios";
import { Segment } from "semantic-ui-react";
import LeagueTable from "./LeagueTable";

// Mock axios
jest.mock("axios", () => {
  const data = {
    data: {
      name: "Premier League"
    }
  };

  return {
    get: jest.fn(() => Promise.resolve(data))
  };
});

function instantiateShallow() {
  return shallow(
    <LeagueTable
      leagueName="Eliteserien"
      tableColors={{
        greens: [],
        reds: []
      }}
      table={[]}
    />
  );
}

describe("<LeagueTable />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(
      <LeagueTable
        leagueName="Eliteserien"
        tableColors={{
          greens: [1, 2],
          reds: [19, 20]
        }}
        table={[{}]}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it("should have a default state", () => {
    const elem = instantiateShallow();
    expect(elem.state()).toEqual({
      table: [],
      leagueName: "Eliteserien",
      tableColors: {
        greens: [],
        reds: []
      },
      loading: true
    });
  });

  it("sets the league name in state after componentWillReceiveProps", () => {
    const uri = "http://api.tv2.no/sport/resources/tournaments/230/";
    const nextProps = {
      className: "print",
      leagueName: "Premier League",
      table: [
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500568/",
          awayDraws: "2",
          awayGoalsAgainst: "10",
          awayGoalsFor: "32",
          awayLosses: "1",
          awayMatches: "14",
          awayPoints: "35",
          awayWins: "11",
          draws: "3",
          goalDifference: "63",
          goalsAgainst: "20",
          goalsFor: "83",
          homeDraws: "1",
          homeGoalsAgainst: "10",
          homeGoalsFor: "51",
          homeLosses: "0",
          homeMatches: "15",
          homePoints: "43",
          homeWins: "14",
          id: "500568",
          losses: "1",
          matches: "29",
          points: "78",
          position: "1",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/722/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "25"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500569/",
          awayDraws: "3",
          awayGoalsAgainst: "16",
          awayGoalsFor: "25",
          awayLosses: "4",
          awayMatches: "15",
          awayPoints: "27",
          awayWins: "8",
          draws: "5",
          goalDifference: "34",
          goalsAgainst: "22",
          goalsFor: "56",
          homeDraws: "2",
          homeGoalsAgainst: "6",
          homeGoalsFor: "31",
          homeLosses: "1",
          homeMatches: "14",
          homePoints: "35",
          homeWins: "11",
          id: "500569",
          losses: "5",
          matches: "29",
          points: "62",
          position: "2",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/735/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "19"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500570/",
          awayDraws: "3",
          awayGoalsAgainst: "22",
          awayGoalsFor: "34",
          awayLosses: "3",
          awayMatches: "14",
          awayPoints: "27",
          awayWins: "8",
          draws: "9",
          goalDifference: "35",
          goalsAgainst: "32",
          goalsFor: "67",
          homeDraws: "6",
          homeGoalsAgainst: "10",
          homeGoalsFor: "33",
          homeLosses: "0",
          homeMatches: "15",
          homePoints: "33",
          homeWins: "9",
          id: "500570",
          losses: "3",
          matches: "29",
          points: "60",
          position: "3",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/733/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "17"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500571/",
          awayDraws: "3",
          awayGoalsAgainst: "15",
          awayGoalsFor: "24",
          awayLosses: "4",
          awayMatches: "14",
          awayPoints: "24",
          awayWins: "7",
          draws: "7",
          goalDifference: "31",
          goalsAgainst: "24",
          goalsFor: "55",
          homeDraws: "4",
          homeGoalsAgainst: "9",
          homeGoalsFor: "31",
          homeLosses: "1",
          homeMatches: "15",
          homePoints: "34",
          homeWins: "10",
          id: "500571",
          losses: "5",
          matches: "29",
          points: "58",
          position: "4",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/740/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "17"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500572/",
          awayDraws: "3",
          awayGoalsAgainst: "16",
          awayGoalsFor: "26",
          awayLosses: "5",
          awayMatches: "15",
          awayPoints: "24",
          awayWins: "7",
          draws: "5",
          goalDifference: "24",
          goalsAgainst: "26",
          goalsFor: "50",
          homeDraws: "2",
          homeGoalsAgainst: "10",
          homeGoalsFor: "24",
          homeLosses: "3",
          homeMatches: "14",
          homePoints: "29",
          homeWins: "9",
          id: "500572",
          losses: "8",
          matches: "29",
          points: "53",
          position: "5",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/723/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "16"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500573/",
          awayDraws: "4",
          awayGoalsAgainst: "24",
          awayGoalsFor: "16",
          awayLosses: "8",
          awayMatches: "15",
          awayPoints: "13",
          awayWins: "3",
          draws: "6",
          goalDifference: "11",
          goalsAgainst: "41",
          goalsFor: "52",
          homeDraws: "2",
          homeGoalsAgainst: "17",
          homeGoalsFor: "36",
          homeLosses: "2",
          homeMatches: "14",
          homePoints: "32",
          homeWins: "10",
          id: "500573",
          losses: "10",
          matches: "29",
          points: "45",
          position: "6",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/738/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "13"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500574/",
          awayDraws: "6",
          awayGoalsAgainst: "14",
          awayGoalsFor: "12",
          awayLosses: "4",
          awayMatches: "14",
          awayPoints: "18",
          awayWins: "4",
          draws: "10",
          goalDifference: "-2",
          goalsAgainst: "26",
          goalsFor: "24",
          homeDraws: "4",
          homeGoalsAgainst: "12",
          homeGoalsFor: "12",
          homeLosses: "5",
          homeMatches: "15",
          homePoints: "22",
          homeWins: "6",
          id: "500574",
          losses: "9",
          matches: "29",
          points: "40",
          position: "7",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/762/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "10"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500575/",
          awayDraws: "5",
          awayGoalsAgainst: "25",
          awayGoalsFor: "20",
          awayLosses: "6",
          awayMatches: "14",
          awayPoints: "14",
          awayWins: "3",
          draws: "10",
          goalDifference: "-1",
          goalsAgainst: "42",
          goalsFor: "41",
          homeDraws: "5",
          homeGoalsAgainst: "17",
          homeGoalsFor: "21",
          homeLosses: "4",
          homeMatches: "15",
          homePoints: "23",
          homeWins: "6",
          id: "500575",
          losses: "10",
          matches: "29",
          points: "37",
          position: "8",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/731/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "9"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500576/",
          awayDraws: "2",
          awayGoalsAgainst: "21",
          awayGoalsFor: "17",
          awayLosses: "8",
          awayMatches: "14",
          awayPoints: "14",
          awayWins: "4",
          draws: "6",
          goalDifference: "-8",
          goalsAgainst: "47",
          goalsFor: "39",
          homeDraws: "4",
          homeGoalsAgainst: "26",
          homeGoalsFor: "22",
          homeLosses: "5",
          homeMatches: "15",
          homePoints: "22",
          homeWins: "6",
          id: "500576",
          losses: "13",
          matches: "29",
          points: "36",
          position: "9",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/781/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "10"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500577/",
          awayDraws: "4",
          awayGoalsAgainst: "17",
          awayGoalsFor: "7",
          awayLosses: "8",
          awayMatches: "14",
          awayPoints: "10",
          awayWins: "2",
          draws: "10",
          goalDifference: "-10",
          goalsAgainst: "38",
          goalsFor: "28",
          homeDraws: "6",
          homeGoalsAgainst: "21",
          homeGoalsFor: "21",
          homeLosses: "3",
          homeMatches: "15",
          homePoints: "24",
          homeWins: "6",
          id: "500577",
          losses: "11",
          matches: "29",
          points: "34",
          position: "10",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/810/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "8"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500578/",
          awayDraws: "5",
          awayGoalsAgainst: "31",
          awayGoalsFor: "10",
          awayLosses: "9",
          awayMatches: "15",
          awayPoints: "8",
          awayWins: "1",
          draws: "7",
          goalDifference: "-16",
          goalsAgainst: "49",
          goalsFor: "33",
          homeDraws: "2",
          homeGoalsAgainst: "18",
          homeGoalsFor: "23",
          homeLosses: "4",
          homeMatches: "14",
          homePoints: "26",
          homeWins: "8",
          id: "500578",
          losses: "13",
          matches: "29",
          points: "34",
          position: "11",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/730/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "9"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500579/",
          awayDraws: "5",
          awayGoalsAgainst: "23",
          awayGoalsFor: "14",
          awayLosses: "7",
          awayMatches: "15",
          awayPoints: "14",
          awayWins: "3",
          draws: "9",
          goalDifference: "-10",
          goalsAgainst: "44",
          goalsFor: "34",
          homeDraws: "4",
          homeGoalsAgainst: "21",
          homeGoalsFor: "20",
          homeLosses: "5",
          homeMatches: "14",
          homePoints: "19",
          homeWins: "5",
          id: "500579",
          losses: "12",
          matches: "29",
          points: "33",
          position: "12",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/788/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "8"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500580/",
          awayDraws: "4",
          awayGoalsAgainst: "23",
          awayGoalsFor: "10",
          awayLosses: "8",
          awayMatches: "14",
          awayPoints: "10",
          awayWins: "2",
          draws: "6",
          goalDifference: "-17",
          goalsAgainst: "42",
          goalsFor: "25",
          homeDraws: "2",
          homeGoalsAgainst: "19",
          homeGoalsFor: "15",
          homeLosses: "7",
          homeMatches: "15",
          homePoints: "20",
          homeWins: "6",
          id: "500580",
          losses: "15",
          matches: "29",
          points: "30",
          position: "13",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/791/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "8"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500581/",
          awayDraws: "5",
          awayGoalsAgainst: "37",
          awayGoalsFor: "20",
          awayLosses: "9",
          awayMatches: "16",
          awayPoints: "11",
          awayWins: "2",
          draws: "9",
          goalDifference: "-18",
          goalsAgainst: "54",
          goalsFor: "36",
          homeDraws: "4",
          homeGoalsAgainst: "17",
          homeGoalsFor: "16",
          homeLosses: "4",
          homeMatches: "13",
          homePoints: "19",
          homeWins: "5",
          id: "500581",
          losses: "13",
          matches: "29",
          points: "30",
          position: "14",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/724/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "7"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500582/",
          awayDraws: "2",
          awayGoalsAgainst: "30",
          awayGoalsFor: "10",
          awayLosses: "10",
          awayMatches: "15",
          awayPoints: "11",
          awayWins: "3",
          draws: "6",
          goalDifference: "-25",
          goalsAgainst: "50",
          goalsFor: "25",
          homeDraws: "4",
          homeGoalsAgainst: "20",
          homeGoalsFor: "15",
          homeLosses: "5",
          homeMatches: "14",
          homePoints: "19",
          homeWins: "5",
          id: "500582",
          losses: "15",
          matches: "29",
          points: "30",
          position: "15",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/776/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "8"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500583/",
          awayDraws: "4",
          awayGoalsAgainst: "25",
          awayGoalsFor: "15",
          awayLosses: "8",
          awayMatches: "15",
          awayPoints: "13",
          awayWins: "3",
          draws: "8",
          goalDifference: "-13",
          goalsAgainst: "40",
          goalsFor: "27",
          homeDraws: "4",
          homeGoalsAgainst: "15",
          homeGoalsFor: "12",
          homeLosses: "6",
          homeMatches: "14",
          homePoints: "16",
          homeWins: "4",
          id: "500583",
          losses: "14",
          matches: "29",
          points: "29",
          position: "16",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/736/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "7"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500584/",
          awayDraws: "6",
          awayGoalsAgainst: "20",
          awayGoalsFor: "13",
          awayLosses: "5",
          awayMatches: "13",
          awayPoints: "12",
          awayWins: "2",
          draws: "13",
          goalDifference: "-12",
          goalsAgainst: "41",
          goalsFor: "29",
          homeDraws: "7",
          homeGoalsAgainst: "21",
          homeGoalsFor: "16",
          homeLosses: "6",
          homeMatches: "16",
          homePoints: "16",
          homeWins: "3",
          id: "500584",
          losses: "11",
          matches: "29",
          points: "28",
          position: "17",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/728/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "5"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500585/",
          awayDraws: "4",
          awayGoalsAgainst: "23",
          awayGoalsFor: "9",
          awayLosses: "8",
          awayMatches: "14",
          awayPoints: "10",
          awayWins: "2",
          draws: "9",
          goalDifference: "-19",
          goalsAgainst: "46",
          goalsFor: "27",
          homeDraws: "5",
          homeGoalsAgainst: "23",
          homeGoalsFor: "18",
          homeLosses: "6",
          homeMatches: "15",
          homePoints: "17",
          homeWins: "4",
          id: "500585",
          losses: "14",
          matches: "29",
          points: "27",
          position: "18",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/767/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "6"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500586/",
          awayDraws: "5",
          awayGoalsAgainst: "33",
          awayGoalsFor: "12",
          awayLosses: "9",
          awayMatches: "15",
          awayPoints: "8",
          awayWins: "1",
          draws: "9",
          goalDifference: "-26",
          goalsAgainst: "54",
          goalsFor: "28",
          homeDraws: "4",
          homeGoalsAgainst: "21",
          homeGoalsFor: "16",
          homeLosses: "5",
          homeMatches: "14",
          homePoints: "19",
          homeWins: "5",
          id: "500586",
          losses: "14",
          matches: "29",
          points: "27",
          position: "19",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/794/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "6"
        },
        {
          "@uri": "http://api.tv2.no/sport/resources/table/500587/",
          awayDraws: "4",
          awayGoalsAgainst: "23",
          awayGoalsFor: "7",
          awayLosses: "10",
          awayMatches: "15",
          awayPoints: "7",
          awayWins: "1",
          draws: "11",
          goalDifference: "-21",
          goalsAgainst: "43",
          goalsFor: "22",
          homeDraws: "7",
          homeGoalsAgainst: "20",
          homeGoalsFor: "15",
          homeLosses: "5",
          homeMatches: "14",
          homePoints: "13",
          homeWins: "2",
          id: "500587",
          losses: "15",
          matches: "29",
          points: "20",
          position: "20",
          season: {
            "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
          },
          team: {
            "@uri": "http://api.tv2.no/sport/resources/teams/783/"
          },
          tournament: {
            "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
          },
          wins: "3"
        }
      ],
      tableColors: {
        greens: [0, 1, 2, 3],
        reds: [17, 18, 19]
      }
    };
    const elem = instantiateShallow();
    elem.instance().getLeagueName(uri);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(uri);
  });

  it("should render a segment with classname print", () => {
    const elem = instantiateShallow();
    expect(elem.find(Segment).hasClass("print")).toEqual(true);
  });

  // it('gets the league name and sets it in state', () => {
  // 	const uri = 'http://api.tv2.no/sport/resources/tournaments/230/'
  // 	const elem = instantiateShallow();
  // 	elem.instance().getLeagueName(uri).then((e) => {
  // 		console.log(e);
  // 	});
  // 	expect(axios.get).toHaveBeenCalled();
  // 	expect(axios.get).toHaveBeenCalledWith(uri);
  // })
});
