import React from "react";
import renderer from "react-test-renderer";
import LiveTeasePreview from "./LiveTeasePreview";

describe("<LiveTeasePreview />", () => {
  it("Should render properly", () => {
    let elem = renderer.create(
      <LiveTeasePreview
        selectedMatch="Brighton - Manchester United"
        matchTimeText="Avspark kl."
        matchTime="21.00"
        channels={[5]}
        allChannels={[
          { name: "TV 2", value: "1" },
          { name: "TV 2 Sport Premium", value: "5" }
        ]}
        script="S18 5"
        awayColor="1"
        homeColor="2"
        findColor={() => ({ hex: "FFFFFF" })}
      />
    );
    expect(elem).toMatchSnapshot();
    elem = renderer.create(
      <LiveTeasePreview
        selectedMatch="Brighton - Manchester United"
        matchTimeText="Avspark kl."
        matchTime="21.00"
        awayColor="1"
        homeColor="2"
        channels={[5]}
        allChannels={[
          { name: "TV 2", value: "1" },
          { name: "TV 2 Sport Premium", value: "5" }
        ]}
        script="S18 5"
        findColor={() => ({ hex: "FFFFFF" })}
      />
    );
    expect(elem).toMatchSnapshot();
  });
});
