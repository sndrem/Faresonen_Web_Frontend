// @flow
import axios from "axios";

export default {
  getAllLeagues() {
    return axios.post("/leagues/all", {
      max: 1500,
      sportId: 1,
      filterImportant: "feed"
    });
  },
  getLeagueData(id: string) {
    if (!id)
      throw new Error(
        `You must provide an ID to get league data. ${id} provided is not valid`
      );
    return axios.get(`http://api.tv2.no/sport/resources/tournaments/${id}`);
  },
  getActiveSeasonData(url: string) {
    if (!url)
      throw new Error(`You must specify a url to get the active season`);
    return axios.get(url);
  },
  getActiveSeasonNumber(url: string) {
    return url.match(/\d+/gm)[1];
  }
};
