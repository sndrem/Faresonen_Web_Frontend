import altOmFotballMatchService from "./altOmFotballMatchService";

function getWrongId() {
  altOmFotballMatchService.getChannelName(null);
}

function idDoesNotExists() {
  altOmFotballMatchService.getChannelName(-1);
}
describe("altOmFotballMatchService", () => {
  it("Should get the correct channel name based on ID", () => {
    // ID is okay
    const id = 5;
    const name = altOmFotballMatchService.getChannelName(id);
    expect(name).toEqual("TV 2 Sport Premium");

    // ID is not valid
    expect(getWrongId).toThrow();

    // ID does not exists
    expect(idDoesNotExists).toThrow();
  });

  it("Should split names based on a delimited", () => {
    let name = "Sindre Moldeklev";
    let delimiter = " ";
    let result = altOmFotballMatchService.splitNames(name, delimiter);
    expect(result).toEqual(["Sindre", "Moldeklev"]);

    delimiter = "-";
    result = altOmFotballMatchService.splitNames(name, delimiter);
    expect(result).toEqual(["Sindre Moldeklev"]);

    name = "";
    result = altOmFotballMatchService.splitNames(name, delimiter);
    expect(result).toEqual("");
  });

  it("Should filter only matches that are not yet done", () => {
    const matches = [
      {
        name: "A",
        confirmed: "true"
      },
      {
        name: "B",
        confirmed: ""
      },
      {
        name: "C",
        confirmed: ""
      }
    ];
    const filtered = altOmFotballMatchService.filterDoneMatches(matches);
    expect(filtered).toEqual([
      { name: "B", confirmed: "" },
      { name: "C", confirmed: "" }
    ]);
  });
});
