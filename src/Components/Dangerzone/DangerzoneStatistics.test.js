import React from "react";
import renderer from "react-test-renderer";
import DangerzoneStatistics from "./DangerzoneStatistics";

describe("<DangerzoneStatistics />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(
      <DangerzoneStatistics eliteserien={32} obosligaen={0} socketConnected />,
    );
    expect(tree).toMatchSnapshot();
  });
});
