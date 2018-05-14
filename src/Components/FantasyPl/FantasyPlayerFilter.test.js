import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import FantasyPlayerFilter from "./FantasyPlayerFilter";

describe("<FantasyPlayerFilter />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(
      <FantasyPlayerFilter
        setNameFilter={() => {}}
        setPriceFilter={() => {}}
        setDreamTeamFilter={() => {}}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("Should handle the name search", () => {
    const setNameFilterMock = jest.fn();

    const value = { target: { value: "Testing" } };
    const elem = shallow(
      <FantasyPlayerFilter
        setPriceFilter={() => {}}
        setNameFilter={setNameFilterMock}
        setDreamTeamFilter={() => {}}
      />
    );
    elem.instance().handleNameSearch(value);
    expect(setNameFilterMock).toBeCalled();
  });
});
