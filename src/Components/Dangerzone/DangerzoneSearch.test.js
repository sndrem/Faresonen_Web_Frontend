import React from "react";
import { shallow } from "enzyme";
import DangerzoneSearch from "./DangerzoneSearch";

function instantiateShallow() {
  return shallow(
    <DangerzoneSearch
      players={{
        eliteserien: [
          {
            team: "Brann",
            players: [
              {
                name: "Sindre",
                value1: 2
              },
              {
                name: "Ole",
                value1: 1
              }
            ]
          }
        ],
        obosligaen: [
          {
            team: "Mjøndalen",
            players: [
              {
                name: "Mads",
                value1: 2
              },
              {
                name: "Christian",
                value1: 4
              }
            ]
          }
        ]
      }}
    />
  );
}

describe("<DangerzoneSearch />", () => {
  it("Should return correct players when searching", () => {
    const elem = instantiateShallow();
    elem.instance().componentWillReceiveProps({
      players: {
        eliteserien: [
          {
            team: "Brann",
            players: [
              {
                name: "Sindre",
                value1: 2
              },
              {
                name: "Ole",
                value1: 1
              }
            ]
          }
        ],
        obosligaen: [
          {
            team: "Mjøndalen",
            players: [
              {
                name: "Mads",
                value1: 2
              },
              {
                name: "Christian",
                value1: 4
              }
            ]
          }
        ]
      }
    });
    let results = elem.instance().searchFilter("Sindre", "eliteserien");
    expect(results).toEqual([
      { team: "Brann", players: [{ name: "Sindre", value1: 2 }] }
    ]);

    results = elem.instance().searchFilter("sin", "eliteserien");
    expect(results).toEqual([
      { team: "Brann", players: [{ name: "Sindre", value1: 2 }] }
    ]);

    results = elem.instance().searchFilter("mad", "obosligaen");
    expect(results).toEqual([
      { team: "Mjøndalen", players: [{ name: "Mads", value1: 2 }] }
    ]);

    results = elem.instance().searchFilter("", "obosligaen");
    expect(results).toEqual([
      {
        team: "Mjøndalen",
        players: [
          {
            name: "Mads",
            value1: 2
          },
          {
            name: "Christian",
            value1: 4
          }
        ]
      }
    ]);
  });

  it("Should throw an error user input wrong leagueId", () => {
    const elem = instantiateShallow();
    function search() {
      elem.instance().searchFilter("Sindre", 1);
    }
    expect(search).toThrow();
  });
});
