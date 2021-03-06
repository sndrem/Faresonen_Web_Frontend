import React from "react";
import renderer from "react-test-renderer";
import Dangerzone from "./Dangerzone";
import dangerzoneService from "../../services/dangerzoneService";

describe("Dangerzone", () => {
  it("Should render properly", () => {
    const elem = renderer.create(
      <Dangerzone
        leagueName="Premier League"
        players={[
          {
            name: "Everton",
            players: [
              {
                name: "Wayne Rooney",
                place: 1,
                team: "Everton",
                value1: 1,
              },
            ],
          },
        ]}
        loading={false}
      />,
    );
    expect(elem).toMatchSnapshot();
  });
  it("Should render properly when players have more than 1 yellow card", () => {
    const elem = renderer.create(
      <Dangerzone
        leagueName="Premier League"
        players={[
          {
            name: "Everton",
            players: [
              {
                name: "Wayne Rooney",
                place: 1,
                team: "Everton",
                value1: 3,
              },
            ],
          },
        ]}
        loading={false}
      />,
    );
    expect(elem).toMatchSnapshot();
  });

  it("Should render properly when no players are present", () => {
    const elem = renderer.create(
      <Dangerzone leagueName="Premier League" players={[]} loading={false} />,
    );
    expect(elem).toMatchSnapshot();
  });

  describe("teams should be sorted alphabetically", () => {
    it("should return a list of alphabetically sorted teams", () => {
      let teams = [
        {name: "Brann"},
        {name: "Start"},
        {name: "Vålerenga"},
        {name: "Bodø/Glimt"},
      ];

      teams = dangerzoneService.sortTeams(teams);
      expect(teams).toEqual([
        {name: "Bodø/Glimt"},
        {name: "Brann"},
        {name: "Start"},
        {name: "Vålerenga"},
      ]);
    });
  });

  describe("players with even number of yellow cards should be returned", () => {
    it("should filter out players with odd number yellow cards", () => {
      const teams = {
        Brann: {
          players: [
            {
              name: "Ole",
              value1: 4,
            },
            {
              name: "Petter",
              value1: -1,
            },
            {
              name: "Sindre",
              value1: 0,
            },
            {
              name: "Nikko",
              value1: 3,
            },
          ],
        },
      };

      const filtered = dangerzoneService.filterPlayers(teams);
      expect(filtered).toEqual([
        {
          name: "Brann",
          players: [{name: "Nikko", value1: 3}],
        },
      ]);
    });
  });

  describe("players should be grouped by team name", () => {
    it("should group players by team name", () => {
      const players = [
        {team: "Brann", name: "Ole"},
        {team: "Rosenborg", name: "Petter"},
        {team: "Brann", name: "Sigurd"},
        {team: "Ranheim", name: "Kåre"},
        {team: "Brann", name: "Sigve"},
        {team: "Ranheim", name: "Aleks"},
        {team: "Rosenborg", name: "Steffen"},
        {team: "Brann", name: "Sindre"},
      ];

      const grouped = dangerzoneService.groupPlayers(players);
      expect(grouped).toEqual({
        Brann: {
          players: [
            {team: "Brann", name: "Ole"},
            {team: "Brann", name: "Sigurd"},
            {team: "Brann", name: "Sigve"},
            {team: "Brann", name: "Sindre"},
          ],
        },
        Ranheim: {
          players: [
            {team: "Ranheim", name: "Kåre"},
            {team: "Ranheim", name: "Aleks"},
          ],
        },
        Rosenborg: {
          players: [
            {team: "Rosenborg", name: "Petter"},
            {team: "Rosenborg", name: "Steffen"},
          ],
        },
      });
    });
  });
});
