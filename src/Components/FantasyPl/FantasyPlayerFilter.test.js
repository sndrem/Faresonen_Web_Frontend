import React from "react";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import FantasyPlayerFilter from "./FantasyPlayerFilter";

describe("<FantasyPlayerFilter />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(
      <FantasyPlayerFilter
        setNameFilter={() => {}}
        setPriceFilter={() => {}}
        setDreamTeamFilter={() => {}}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it("Should handle the name search", () => {
    const setNameFilterMock = jest.fn();

    const value = {target: {value: "Testing"}};
    const elem = shallow(
      <FantasyPlayerFilter
        setPriceFilter={() => {}}
        setNameFilter={setNameFilterMock}
        setDreamTeamFilter={() => {}}
      />,
    );
    elem.instance().handleNameSearch(value);
    expect(setNameFilterMock).toBeCalled();
  });
  it("Should handle the price search", () => {
    const setPriceFilter = jest.fn();

    const value = {target: {value: 5}};
    const elem = shallow(
      <FantasyPlayerFilter
        setPriceFilter={setPriceFilter}
        setNameFilter={() => {}}
        setDreamTeamFilter={() => {}}
      />,
    );
    elem.instance().handlePriceSearch(value);
    expect(setPriceFilter).toBeCalled();

    elem.instance().handlePriceSearch({target: {value: "hey"}});
    expect(setPriceFilter).toBeCalledWith(-1);
  });

  it("Should handle the dream team filter", () => {
    const setDreamTeamFilterMock = jest.fn();

    const elem = shallow(
      <FantasyPlayerFilter
        setPriceFilter={() => {}}
        setNameFilter={() => {}}
        setDreamTeamFilter={setDreamTeamFilterMock}
      />,
    );
    elem.instance().handleDreamTeamFilter(null, {checked: true});
    expect(setDreamTeamFilterMock).toBeCalled();
  });
});
