import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import MatchInfo from "./MatchInfo";

describe("<MatchInfo />", () => {
  xit("should render properly", () => {
    const tree = renderer.create(
      <MatchInfo
        match={{
          name: "Brann-Ranheim",
          starttime: "01.04.2018",
          referee: {
            "@uri": ""
          },
          status: {
            "@uri": ""
          }
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it("should format the referees name correctly", () => {
    const ref = {
      firstname: "Martin",
      lastname: "Atkinson"
    };

    const elem = shallow(
      <MatchInfo
        match={{
          name: "Man. United - Liverpool",
          starttime: "11.01.1993"
        }}
      />
    );
    expect(MatchInfo.formatRefereeName(ref)).toEqual("Martin Atkinson");
    ref.lastname = "";
    expect(MatchInfo.formatRefereeName(ref)).toEqual("Martin");
    delete ref.lastname;
    expect(MatchInfo.formatRefereeName(ref)).toEqual("Martin");
    ref.lastname = "Moldeklev";
    delete ref.firstname;
    expect(MatchInfo.formatRefereeName(ref)).toEqual("Moldeklev");
    function emptyRefObj() {
      elem.instance.formatRefereeName({});
    }
    expect(emptyRefObj).toThrow();
  });
});
