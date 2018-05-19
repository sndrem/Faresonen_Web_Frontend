import axios from "axios";

export default {
  getAllLeagues() {
    return axios.post("/leagues/all", {
      max: 1500,
      sportId: 1,
      filterImportant: "feed"
    });
  }
};
