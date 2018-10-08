import React from "react";
import {shallow} from "enzyme";
import renderer from "react-test-renderer";
import axios from "axios";
import {Segment} from "semantic-ui-react";
import LeagueTable from "./LeagueTable";

// Mock axios
jest.mock("axios", () => {
  const data = {
    data: {
      name: "Premier League"
    }
  };

  return {
    get: jest.fn(() => Promise.resolve(data))
  };
});

function instantiateShallow() {
  return shallow(
    <LeagueTable
      leagueName="Eliteserien"
      tableColors={{
        greens: [],
        reds: []
      }}
      table={[]}
    />
  );
}

describe("<LeagueTable />", () => {
  it("Should render properly", () => {
    const tree = renderer.create(
      <LeagueTable
        leagueName="Eliteserien"
        tableColors={{
          greens: [1, 2],
          reds: [19, 20]
        }}
        table={[{}]}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it("should have a default state", () => {
    const elem = instantiateShallow();
    expect(elem.state()).toEqual({
      table: [],
      leagueName: "Eliteserien",
      tableColors: {
        greens: [],
        reds: []
      },
      loading: true
    });
  });

  it("sets the league name in state after componentWillReceiveProps", () => {
    const uri = "http://api.tv2.no/sport/resources/tournaments/230/";
    const elem = instantiateShallow();
    elem.instance().getLeagueName(uri);
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(uri);
  });

  it("should render a segment with classname print", () => {
    const elem = instantiateShallow();
    expect(elem.find(Segment).hasClass("print")).toEqual(true);
  });

  // it('gets the league name and sets it in state', () => {
  // 	const uri = 'http://api.tv2.no/sport/resources/tournaments/230/'
  // 	const elem = instantiateShallow();
  // 	elem.instance().getLeagueName(uri).then((e) => {
  // 		console.log(e);
  // 	});
  // 	expect(axios.get).toHaveBeenCalled();
  // 	expect(axios.get).toHaveBeenCalledWith(uri);
  // })
});
