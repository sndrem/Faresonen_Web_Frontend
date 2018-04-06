import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { Item } from "semantic-ui-react";
import MatchInfo from "./MatchInfo";

describe("<MatchInfo />", () => {
  it("Should render correctly", () => {
    const tree = renderer.create(
      <MatchInfo
        matchName="Man. United - Liverpool"
        stadium="Old Trafford"
        startDate="2018-02-05T13:45:00+02.00"
        startTime="13.45"
        channel="TV 2 Sport Premium"
        referee="Martin Atkinson"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("Should render header as Utsatt (delayed) if the status is delayed", () => {
    const elem = shallow(
      <MatchInfo
        matchName="Man. United - Liverpool"
        stadium="Old Trafford"
        startDate="2018-02-05T13:45:00+02.00"
        startTime="13.45"
        channel="TV 2 Sport Premium"
        referee="Martin Atkinson"
        status={{
          "@uri": "http://api.tv2.no/sport/resources/statuses/2/"
        }}
      />
    );
    const header = elem.find(Item.Header);
    expect(header.html()).toEqual(
      '<div class="header">UTSATT: Man. United - Liverpool, Old Trafford</div>'
    );
  });

  it("Should render a normal header if no status is provided", () => {
    const elem = shallow(
      <MatchInfo
        matchName="Man. United - Liverpool"
        stadium="Old Trafford"
        startDate="2018-02-05T13:45:00+02.00"
        startTime="13.45"
        channel="TV 2 Sport Premium"
        referee="Martin Atkinson"
      />
    );
    const header = elem.find(Item.Header);
    expect(header.html()).toEqual(
      '<div class="header">Man. United - Liverpool, Old Trafford</div>'
    );
  });
});
