import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import LeagueChooser from "./LeagueChooser";
import data from "../../Data/leagues";

describe("LeagueChooser", () => {
  it("Should render properly", () => {
    const tree = renderer.create(<LeagueChooser leagues={data.leagues} />);
    expect(tree).toMatchSnapshot();
  });
  const elem = shallow(<LeagueChooser leagues={data.leagues} />);
  describe("League props should have data about leagues", () => {
    it("should be rendered a child component for each league defined", () => {
      expect(elem.props().children.length).toEqual(data.leagues.length);
    });
  });
});
