import "../../setupJest";
import FinishedMatchElements from "./FinishedMatchElements";
import testData from "../../Test/testData";

describe("<FinishedMatchElements />", () => {
  it("should return a list of the game name, split by -,;", () => {
    const matchNames = ["Ranheim-Brann", "Ranheim,Brann", "Ranheim;Brann"];
    expect(FinishedMatchElements.splitGameName(matchNames[0])).toEqual([
      "Ranheim",
      "Brann"
    ]);
    expect(FinishedMatchElements.splitGameName(matchNames[1])).toEqual([
      "Ranheim",
      "Brann"
    ]);
    expect(FinishedMatchElements.splitGameName(matchNames[2])).toEqual([
      "Ranheim",
      "Brann"
    ]);
  });

  it("filters events correctly for home and away team", () => {
    const events = testData.matchEvents;

    const calcEvents = FinishedMatchElements.calculateHomeAndAwayEvents(events);
    expect(calcEvents.home.length).toEqual(4);
    expect(calcEvents.away.length).toEqual(0);
  });

  it("filters goal events correctly", () => {
    const events = testData.filterGoalTestData;

    const filteredEvents = FinishedMatchElements.filterGoalEvents(events);
    expect(filteredEvents.length).toEqual(4);
  });

  it("formats goals scorer text strings correctly", () => {
    const scorers = testData.goalScorers;
    const goalString = FinishedMatchElements.formatGoalScoreText(scorers);
    expect(goalString).toEqual("Smalling (55), Lukaku (76), Matic (90)");

    const doubleScorers = testData.doubleScorers;

    const doubleScoreString = FinishedMatchElements.formatGoalScoreText(
      doubleScorers
    );

    expect(doubleScoreString).toEqual("Smalling (55, 76), Matic (90)");
  });
});
