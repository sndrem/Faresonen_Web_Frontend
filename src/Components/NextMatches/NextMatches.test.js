import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import NextMatches from "./NextMatches";

describe("<NextMatches />", () => {
  it("Should render properly", () => {
    let elem = renderer.create(
      <NextMatches matches={[]} nextRoundNumber={2} loading={false} />
    );
    expect(elem).toMatchSnapshot();

    elem = renderer.create(
      <NextMatches matches={[{ id: 1 }]} nextRoundNumber={2} loading={false} />
    );
    expect(elem).toMatchSnapshot();
  });
});
