import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import LiveTeaseGenerator from "./LiveTeaseGenerator";

describe("<LiveTeaseGenerator />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(
      <LiveTeaseGenerator
        matches={[
          {
            name: "Brighton-Man.United",
            starttime: "2017-09-15 09:30:00"
          }
        ]}
        handleChange={() => {}}
        defaultChannels={[5, 10]}
        colors={[
          {
            name: "Rød",
            text: "Rød",
            key: "1",
            value: "1",
            hex: "#e90052",
            color: "#e90052"
          }
        ]}
        allChannels={[{ name: "TV 2", value: "1" }]}
        loading={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  xit("Should be able to correctly format hours", () => {
    const elem = shallow(
      <LiveTeaseGenerator
        matches={[
          {
            name: "Brighton-Man.United",
            starttime: "2018-05-02T12:22:24.041Z"
          }
        ]}
        handleChange={() => {}}
        defaultChannels={[5, 10]}
        colors={[
          {
            name: "Rød",
            text: "Rød",
            key: "1",
            value: "1",
            hex: "#e90052",
            color: "#e90052"
          }
        ]}
        allChannels={[{ name: "TV 2", value: "1" }]}
        loading={false}
      />
    );
    let hours = elem.instance().padTime(9);
    expect(hours).toEqual("09");
    hours = elem.instance().padTime(10);
    expect(hours).toEqual("10");
    hours = elem.instance().padTime(24);
    expect(hours).toEqual("24");
  });

  // TODO Move test to LiveTeaseGeneratorContainer
  xit("Should be able to find the correct color based on a value", () => {
    const elem = shallow(
      <LiveTeaseGenerator
        matches={[
          {
            name: "Brighton-Man.United",
            starttime: "2018-05-02T12:22:24.041Z"
          }
        ]}
        handleChange={() => {}}
        defaultChannels={[5, 10]}
        colors={[
          {
            name: "Rød",
            text: "Rød",
            key: "1",
            value: "1",
            hex: "#e90052",
            color: "#e90052"
          }
        ]}
        allChannels={[{ name: "TV 2", value: "1" }]}
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

    function findColor(colorsToFind, value) {
      elem.instance().findColor(colorsToFind, value);
    }

    let color = elem.instance().findColor(colors, 10);
    expect(color).toEqual({ value: 10, text: "Blå" });
    color = elem.instance().findColor(colors, 9);
    expect(color).toEqual({ value: 9, text: "Lilla" });
    expect(() => findColor(colors, -1)).toThrow();
  });
});
