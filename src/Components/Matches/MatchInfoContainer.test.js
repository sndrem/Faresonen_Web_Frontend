import React from "react";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import MatchInfo from "./MatchInfo";
import MatchInfoContainer from "./Containers/MatchInfoContainer";

describe("<MatchInfo />", () => {
  xit("should render properly", () => {
    const tree = renderer.create(
      <MatchInfo
        match={{
          name: "Brann-Ranheim",
          starttime: "2018-04-02T18:00:00+02:00",
          referee: {
            "@uri": "",
          },
          status: {
            "@uri": "",
          },
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
  it("should format the referees name correctly", () => {
    const ref = {
      firstname: "Martin",
      lastname: "Atkinson",
    };

    const elem = shallow(
      <MatchInfo
        matchName="Manchester United - Liverpool"
        stadium="Old Trafford"
        startDate="11.01.1993"
        startTime=""
        channel="TV 2 Sport Premium"
        referee="Martin Atkinson"
      />,
    );
    expect(MatchInfoContainer.formatRefereeName(ref)).toEqual(
      "Martin Atkinson",
    );
    ref.lastname = "";
    expect(MatchInfoContainer.formatRefereeName(ref)).toEqual("Martin");
    delete ref.lastname;
    expect(MatchInfoContainer.formatRefereeName(ref)).toEqual("Martin");
    ref.lastname = "Moldeklev";
    delete ref.firstname;
    expect(MatchInfoContainer.formatRefereeName(ref)).toEqual("Moldeklev");
    function emptyRefObj() {
      elem.instance.formatRefereeName({});
    }
    expect(emptyRefObj).toThrow();
  });
});
