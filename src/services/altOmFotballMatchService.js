import axios from "axios";

const AltOmFotballMatchService = {
  getMatches: (tournamentId, seasonId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/matches/${tournamentId}/${seasonId}`)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },

  getOnlyDoneMatches: (tournamentId, seasonId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/matches/${tournamentId}/${seasonId}`)
        .then(data => {
          const filtered = data.data.match.filter(
            match => match.confirmed !== "true"
          );
          resolve(filtered);
        })
        .catch(err => reject(err));
    });
  },

  splitNames: (name, delimiter) => {
    if (name) return name.split(delimiter);
    return name;
  }
};

export default AltOmFotballMatchService;
