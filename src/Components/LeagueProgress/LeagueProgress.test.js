import React from "react";
import {shallow} from "enzyme";
import mockAxios from "axios";
import {Progress} from "semantic-ui-react";
import LeagueProgress from "./LeagueProgress";

function mockGetOnce() {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({
    data: [
      {
        data: {
          confirmed: "true",
        },
      },
    ],
  }));
}

function mockAllOnce() {
  mockAxios.all.mockImplementationOnce(() => Promise.resolve({data: ["Yeah"]}));
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
        disableLifecycleMethods: true,
      },
    );
  }

  // TODO Add test for correct calculation of rounds
  // it("Should calculate the correct number of rounds", async () => {
  //   mockAllOnce();
  //   const elem = createElement();
  //   const
  // })

  it("should set state to default if an empty round list is specified", async () => {
    mockGetOnce();
    const elem = createElement();
    const rounds = [];
    elem.instance().calculateRounds(rounds);
    expect(elem.instance().state).toEqual({
      finished: 0,
      left: 0,
      total: 0,
      loading: true,
    });
  });

  it("should throw an error if no rounds are specified", () => {
    mockGetOnce();
    const elem = createElement();
    const rounds = undefined;
    function calculate() {
      elem.instance().calculateRounds(rounds);
    }
    expect(calculate).toThrow();
  });

  it("start off with default state", () => {
    const elem = createElement();
    const defaultState = {
      finished: 0,
      left: 0,
      total: 0,
      loading: true,
    };

    expect(defaultState).toEqual(elem.state());
  });

  it("should have a className of no-print", () => {
    const elem = createElement();
    const progress = elem.find(Progress);
    expect(progress.hasClass("no-print")).toEqual(true);
  });

  it("should initialize with correct props", () => {
    const elem = createElement();
    const progressElement = elem.find(Progress);
    const {
      color, progress, total, value,
    } = progressElement.props();
    expect(color).toEqual("green");
    expect(progress).toEqual("ratio");
    expect(total).toEqual(0);
    expect(value).toEqual(0);
    // expect(progress.props()int')).toEqual(true);
  });
});
