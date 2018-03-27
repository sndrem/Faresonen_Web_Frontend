import React from "react";
import { shallow } from "enzyme";
import DangerZoneAccumulator from "./DangerZoneAccumulator";
import testData from "../../Test/testData";

describe("<DangerzoneAccumulator />", () => {
  it("Should return a message element for the getInfoMessage()", () => {
    const elem = shallow(
      <DangerZoneAccumulator
        events={testData.yellowCardEvents}
        removeEvent={() => {}}
        removePlayer={() => {}}
      />
    );

    const message = elem.instance().getInfoMessage();
    expect(message.props.info).toEqual(true);
    expect(message.props.icon).toEqual("info");
    expect(message.props.header).toEqual("Informasjon");
  });

  it("should remove an event from state correctly", () => {
    const elem = shallow(
      <DangerZoneAccumulator
        events={[]}
        removeEvent={() => {}}
        removePlayer={() => {}}
      />
    );
    // Set state manually
    elem.state().data.events = testData.yellowCardAndPlayerEvents;
    expect(elem.state().data.events.length).toEqual(6);
    // Remove player from event
    const removeEvent = {
      player: {
        "@uri": "http://api.tv2.no/sport/resources/people/345617/",
        birthday: "1988-05-28T00:00:00+02:00",
        birthplace: "Pakrac",
        country: {
          "@uri": "http://api.tv2.no/sport/resources/countries/205/"
        },
        created: "2018-03-05T17:45:33+01:00",
        enetpulseId: "463298",
        firstname: "Zoran",
        height: "188",
        id: "345617",
        images: {
          "@uri": "http://api.tv2.no/sport/resources/people/345617/images/"
        },
        lastname: "Popovic",
        memberships: {
          "@uri": "http://api.tv2.no/sport/resources/people/345617/memberships/"
        },
        nifsId: "155223",
        role: {
          "@uri": "http://api.tv2.no/sport/resources/roles/1/"
        },
        weight: "81"
      },
      event: {
        "@uri": "http://api.tv2.no/sport/resources/events/15221417/",
        eventtype: {
          "@uri": "http://api.tv2.no/sport/resources/eventtypes/2/"
        },
        eventtime: "41",
        extendedeventtype: {
          "@uri": "http://api.tv2.no/sport/resources/extendedeventtypes/1200/"
        },
        goalsTeamA: "1",
        goalsTeamB: "0",
        id: "15221417",
        match: {
          "@uri": "http://api.tv2.no/sport/resources/matches/912485/"
        },
        person1: {
          "@uri": "http://api.tv2.no/sport/resources/people/345617/"
        },
        realTime: "2018-03-18T18:46:57+01:00",
        team: {
          "@uri": "http://api.tv2.no/sport/resources/teams/307/"
        }
      }
    };
    elem.instance().removeEventFromState(removeEvent);
    expect(elem.state().data.events.length).toEqual(5);

    // Try to remove an event with wrong player id
    expect(
      elem.instance().removeEventFromState({
        player: {
          id: 123
        }
      })
    ).toEqual(false);

    expect(elem.state().data.events.length).toEqual(5);

    const removeEmptyObject = () => {
      elem.instance().removeEventFromState({});
    };

    // Test to remove an event that does not exists
    expect(removeEmptyObject).toThrow();
  });
});
