import DangerzoneService from "./dangerzoneService";

describe("DangerzoneService", () => {
  it("should convert objects to an array of objects", () => {
    const objects = {
      Brann: {
        players: [
          {
            name: "Sindre"
          },
          {
            name: "Ole"
          }
        ]
      },
      Rosenborg: {
        players: [
          {
            name: "Petter"
          },
          {
            name: "Kåre"
          }
        ]
      }
    };

    expect(DangerzoneService.fromObjectToArray(objects)).toEqual([
      {
        team: "Brann",
        players: [{ name: "Sindre" }, { name: "Ole" }]
      },
      {
        team: "Rosenborg",
        players: [{ name: "Petter" }, { name: "Kåre" }]
      }
    ]);
  });
});
