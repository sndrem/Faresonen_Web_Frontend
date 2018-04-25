import React from "react";
import renderer from "react-test-renderer";
import FantasyStatsList from "./FantasyStatsList";

describe("<FantasyStatsList />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(
      <FantasyStatsList
        players={[
          "£5,6 mill - Harry Kane",
          "£4,2 mill - Mohamed Salah",
          "£3,3 mill - Alexis Sanchez",
          "£2,9 mill - Romelu Lukaku"
        ]}
        header="Dyreste spillere"
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
