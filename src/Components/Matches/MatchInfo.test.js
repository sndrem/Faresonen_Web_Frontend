import React from "react";
import { shallow } from "enzyme";
import "../../setupJest";
import MatchInfo from "./MatchInfo";

describe("<MatchInfo />", () => {
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
