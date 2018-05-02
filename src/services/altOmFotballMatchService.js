import axios from "axios";

const AltOmFotballMatchService = {
  getMatches: (tournamentId, seasonId) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/matches/${tournamentId}/${seasonId}`)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
};

export default AltOmFotballMatchService;
