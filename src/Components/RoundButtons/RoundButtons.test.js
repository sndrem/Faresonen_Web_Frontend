import React from "react";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import RoundButtons from "./RoundButtons";

describe("<RoundButtons />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(
      <RoundButtons
        leagueName="Eliteserien"
        tournamentId={1}
        seasonId={340}
        rounds={[
          {
            "@uri": "http://eliteserien.no",
            name: "1. runde",
            nextRoundId: "2",
            roundNo: "1",
            startdate: "2018-04-25T09:33:22.320Z",
          },
        ]}
        now="2018-04-25T09:33:22.320Z"
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
