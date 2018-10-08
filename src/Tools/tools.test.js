import tools from "./tools";

describe("Utility tools", () => {
  describe("getTableColors for Eliteserien (leagueID = 1)", () => {
    it("returns the correct list of colors for Eliteserien", () => {
      const data = tools.getTableColors(1);
      expect(data).toEqual({
        greens: [0, 1, 2],
        reds: [14, 15],
      });
    });
  });

  describe("getTableColors for Premier League (leagueID = 230)", () => {
    it("returns the correct list of colors for Eliteserien", () => {
      const data = tools.getTableColors(230);
      expect(data).toEqual({
        greens: [0, 1, 2, 3],
        reds: [17, 18, 19],
      });
    });
  });
});

describe("Extraction of personIds", () => {
  it("Should extract personIds correctly", () => {
    const personUrls = [
      "http://api.tv2.no/sport/resources/people/207243/",
      "http://api.tv2.no/sport/resources/people/1995/",
      "",
      "http://api.tv2.no/sport/resources/peoples/207243/",
      "http://api.tv2.no/sport/resources/207243/",
      "http://api.tv2.no/sport/resources/people/207243/people/1876",
    ];

    expect(tools.extractPersonId(personUrls[0])).toEqual(207243);
    expect(tools.extractPersonId(personUrls[1])).toEqual(1995);
    expect(tools.extractPersonId(personUrls[2])).toEqual(-1);
    expect(tools.extractPersonId(personUrls[3])).toEqual(-1);
    expect(tools.extractPersonId(personUrls[4])).toEqual(-1);
    expect(tools.extractPersonId(personUrls[5])).toEqual(207243);
  });
});
