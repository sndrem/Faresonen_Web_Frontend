import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import PlayerProfile from "./PlayerProfile";

describe("<PlayerProfile />", () => {
  it("Should render properly", () => {
    let tree = renderer.create(
      <PlayerProfile
        name="Marcos Alonso"
        teamName="Chelsea"
        news=""
        photo="p82263.jpg"
        chanceOfPlayingNextRound={100}
        inDreamTeam
        cost={72}
        selectedBy="19,7"
        points={146}
      />
    );
    expect(tree).toMatchSnapshot();
    tree = renderer.create(
      <PlayerProfile
        name="Marcos Alonso"
        teamName="Chelsea"
        news=""
        cost={72}
        selectedBy="19,7"
        points={146}
      />
    );
    expect(tree).toMatchSnapshot();
    tree = renderer.create(<PlayerProfile name="Marcos Alonso" />);
    expect(tree).toMatchSnapshot();
  });
});
