import React from "react";
import renderer from "react-test-renderer";
import TopScorers from "./Topscorers";

describe("<TopScorers />", () => {
  it("Should render corretly", () => {
    let tree = renderer.create(
      <TopScorers
        players={[
          {
            place: 1,
            name: "Sindre Moldeklev",
            team: "Mathopen IL",
            value1: 3,
            value2: 4,
            value3: 0.75
          }
        ]}
        loading={false}
      />
    );
    expect(tree).toMatchSnapshot();

    // No players
    tree = renderer.create(<TopScorers players={[]} loading={false} />);
    expect(tree).toMatchSnapshot();
  });

  it("");
});
