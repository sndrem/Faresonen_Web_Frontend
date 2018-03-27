import React from "react";
import renderer from "react-test-renderer";
import FaresoneMenu from "./FaresoneMenu";

describe("<FaresoneMenu />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(<FaresoneMenu />);
    expect(tree).toMatchSnapshot();
  });
});
