import React from "react";
import axios from "axios";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import LeagueTableItem from "./LeagueTableItem";

describe("<LeagueTableItem />", () => {
  it("Should render properly", () => {
    const url = "http://api.tv2.no/sport/resources/teams/309/";
    const tree = renderer.create(
      <LeagueTableItem
        tableData={{
          team: {
            "@uri": url,
          },
          rowColor: "green",
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
  it("Should fetch team data", () => {
    const url = "http://api.tv2.no/sport/resources/teams/309/";
    const elem = shallow(
      <LeagueTableItem
        tableData={{
          team: {
            "@uri": url,
          },
          rowColor: "green",
        }}
      />,
    );
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(url);
  });
});

// Mock axios
jest.mock("axios", () => {
  const data = {
    data: {
      "@uri": "http://api.tv2.no/sport/resources/teams/309/",
      updated: "2017-10-25T09:57:03.309+02:00",
      version: "2",
      comments:
        "<b>Seriemester (3):</b><br>\r\n2011, 2012, 2014<br>\r\n<b>Norgesmester (4):</b><br>\r\n1994, 2005, 2013, 2014<br>\r\n<b>UEFA Champions League:</b><br>\r\nGruppespill i 1999/00",
      country: {
        "@uri": "http://api.tv2.no/sport/resources/countries/1/",
      },
      email: "mfk@moldefk.no",
      enetpulseId: "9917",
      fax: "+47 71 20 25 01",
      foundedText: "19. juni 1911",
      fullName: "Molde",
      homepage: "www.moldefk.no",
      id: "309",
      images: {
        "@uri": "http://api.tv2.no/sport/resources/teams/309/images/",
      },
      name: "Molde",
      name10: "Molde FK",
      national: "false",
      nifsId: "6",
      norsktippingId: "230",
      postaddress: "Molde",
      postnumber: "6412",
      shortName: "MOL",
      sport: {
        "@uri": "http://api.tv2.no/sport/resources/sports/1/",
      },
      stadium: {
        "@uri": "http://api.tv2.no/sport/resources/stadiums/7/",
      },
      street: "Molde FK<br/>Julsundveien 14<br/>",
      telephone: "+47 71 20 25 00",
      tvname: "MOL",
      visibility: "31",
    },
  };

  return {
    get: jest.fn(() => Promise.resolve(data)),
  };
});
