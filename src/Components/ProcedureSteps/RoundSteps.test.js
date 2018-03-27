import React from "react";
import renderer from "react-test-renderer";
import RoundSteps from "./RoundSteps";

describe("<RoundSteps />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(<RoundSteps league="Eliteserien" round={1} />);
    expect(tree).toMatchSnapshot();
  });
});
