import React from "react";
import { shallow } from "enzyme";
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
        script="S18 5"
        awayColor={{
          text: "Rød",
          hex: "#e90052"
        }}
        homeColor={{
          text: "Yellow",
          hex: "#eaff04"
        }}
      />
    );
    expect(elem).toMatchSnapshot();
    elem = renderer.create(
      <LiveTeasePreview
        selectedMatch="Brighton - Manchester United"
        matchTimeText="Avspark kl."
        matchTime="21.00"
        channels={[5]}
        script="S18 5"
      />
    );
    expect(elem).toMatchSnapshot();
  });
});
