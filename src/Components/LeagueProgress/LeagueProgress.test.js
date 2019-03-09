import React from "react";
import { shallow } from "enzyme";
import mockAxios from "axios";
import { Progress } from "semantic-ui-react";
import LeagueProgress from "./LeagueProgress";

function mockGetOnce() {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: [
        {
          data: {
            confirmed: "true"
          }
        }
      ]
    })
  );
}

describe("<LeagueProgess />", () => {
  function createElement() {
    return shallow(
      <LeagueProgress
        leagueName="Premier League"
        tournamentId={230}
        seasonId={340}
      />,
      {
        disableLifecycleMethods: true
      }
    );
  }

  it("should throw an error if no rounds are specified", () => {
    mockGetOnce();
    const elem = createElement();
    const rounds = undefined;
    function calculate() {
      elem.instance().calculateRounds(rounds);
    }
    expect(calculate).toThrow();
  });

  it("should have a className of no-print", () => {
    const elem = createElement();
    const progress = elem.find(Progress);
    expect(progress.hasClass("no-print")).toEqual(true);
  });

  it("should initialize with correct props", () => {
    const elem = createElement();
    const progressElement = elem.find(Progress);
    const { color, progress } = progressElement.props();
    expect(color).toEqual("green");
    expect(progress).toEqual("ratio");
  });
});
