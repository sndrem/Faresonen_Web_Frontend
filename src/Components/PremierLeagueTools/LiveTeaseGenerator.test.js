import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import LiveTeaseGenerator from "./LiveTeaseGenerator";

describe("<LiveTeaseGenerator />", () => {
  xit("Should render properly", () => {
    const tree = renderer.create(
      <LiveTeaseGenerator
        matches={[
          {
            name: "Brighton-Man.United",
            starttime: "2018-05-02T12:22:24.041Z"
          }
        ]}
        setMatchTimeText={() => {}}
        setTime={() => {}}
        setSelectedMatch={() => {}}
        setChannels={() => {}}
        setHomeColor={() => {}}
        setAwayColor={() => {}}
        defaultChannels={["TV 2 Sport Premium", "TV 2 Sumo"]}
        loading={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("Should be able to correctly format hours", () => {
    const elem = shallow(
      <LiveTeaseGenerator
        matches={[
          {
            name: "Brighton-Man.United",
            starttime: "2018-05-02T12:22:24.041Z"
          }
        ]}
        setMatchTimeText={() => {}}
        setTime={() => {}}
        setSelectedMatch={() => {}}
        setChannels={() => {}}
        setHomeColor={() => {}}
        setAwayColor={() => {}}
        defaultChannels={["TV 2 Sport Premium", "TV 2 Sumo"]}
        loading={false}
      />
    );
    let hours = elem.instance().formatTime(9);
    expect(hours).toEqual("09");
    hours = elem.instance().formatTime(10);
    expect(hours).toEqual("10");
    hours = elem.instance().formatTime(24);
    expect(hours).toEqual("24");
  });

  it("Should be able to find the correct color based on a value", () => {
    const elem = shallow(
      <LiveTeaseGenerator
        matches={[
          {
            name: "Brighton-Man.United",
            starttime: "2018-05-02T12:22:24.041Z"
          }
        ]}
        setMatchTimeText={() => {}}
        setTime={() => {}}
        setSelectedMatch={() => {}}
        setChannels={() => {}}
        setHomeColor={() => {}}
        setAwayColor={() => {}}
        defaultChannels={["TV 2 Sport Premium", "TV 2 Sumo"]}
        loading={false}
      />
    );
    const colors = [
      { value: 1, text: "Rød" },
      { value: 10, text: "Blå" },
      { value: 15, text: "Grønn" },
      { value: 4, text: "Gul" },
      { value: 9, text: "Lilla" }
    ];
    let color = elem.instance().findColor(colors, 10);
    expect(color).toEqual({ value: 10, text: "Blå" });
    color = elem.instance().findColor(colors, 9);
    expect(color).toEqual({ value: 9, text: "Lilla" });
    expect(() => findColor(colors, -1)).toThrow();

    function findColor(colors, value) {
      elem.instance().findColor(colors, value);
    }
  });
});
