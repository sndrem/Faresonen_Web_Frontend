import React from "react";
import {shallow, mount} from "enzyme";
import renderer from "react-test-renderer";
import AboutAccordion from "./AboutAccordion";

describe("<AboutAccordion />", () => {
  it("Should render properly", () => {
    const elem = renderer.create(<AboutAccordion />);
    expect(elem).toMatchSnapshot();
  });
});
