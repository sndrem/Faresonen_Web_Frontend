import React from "react";
import {shallow, mount} from "enzyme";
import renderer from "react-test-renderer";
import AboutAccordion from "./AboutAccordion";

describe("<AboutAccordion />", () => {
  it("Should render properly", () => {
    const elem = renderer.create(<AboutAccordion />);
    expect(elem).toMatchSnapshot();
  });

  it("Should handle the activeItem properly", () => {
    const elem = shallow(<AboutAccordion />);
    expect(elem.instance().state.activeIndex).toEqual(0);
    elem.instance().handleClick(null, {index: 1});
    expect(elem.instance().state.activeIndex).toEqual(1);
  });

  it("Should mark the correct element as active", () => {
    const elem = mount(<AboutAccordion />);
    elem.instance().handleClick(null, {index: 1});
    expect(elem.find(".active").length).toEqual(2);
  });

  it("Should correctly calculate the new index", () => {
    const elem = shallow(<AboutAccordion />);
    const state = {activeIndex: 2};
    elem.instance().state = state;
    let newIndex = elem.instance().calculateNewIndex(2, state.activeIndex);
    expect(newIndex).toEqual(-1);

    state.activeIndex = 3;
    newIndex = elem.instance().calculateNewIndex(3, state.activeIndex);
    expect(newIndex).toEqual(-1);

    newIndex = elem.instance().calculateNewIndex(2, state.activeIndex);
    expect(newIndex).toEqual(2);
  });
});
