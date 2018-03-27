import React from "react";
import renderer from "react-test-renderer";
import FirstSteps from "./FirstSteps";

describe("<FirstSteps />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(<FirstSteps />);
    expect(tree).toMatchSnapshot();
  });
});
