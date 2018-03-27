import React from "react";
import renderer from "react-test-renderer";
import Steps from "./Steps";

describe("<Steps />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(<Steps league="Eliteserien" />);
    expect(tree).toMatchSnapshot();
  });
});
