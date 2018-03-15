import axios from "axios";

const dangerzoneService = {
  getPlayersWithYellowCards(tournamentId) {
    if (!tournamentId) {
      throw new Error(
        "TournamentID is not defined. Please provide a tournamentId"
      );
    }
    return new Promise((resolve, reject) => {
      axios
        .get(`/statistics/yellowcards/${tournamentId}`)
        .then(data => {
          resolve({ data: data.data });
        })
        .catch(err => reject(err));
    });
  },

  sortTeams(players) {
    return players.sort((a, b) => a.name.localeCompare(b.name));
  },

  filterPlayers(players) {
    return Object.keys(players)
      .map(team => ({
        name: team,
        players: players[team].players.filter(
          p => p.value1 % 2 === 0 && p.value1 !== 0
        )
      }))
      .filter(team => team.players.length > 0);
  },

  groupPlayers(players) {
    return players.reduce((obj, elem) => {
      if (!obj[elem.team]) {
        // eslint-disable-next-line no-param-reassign
        obj[elem.team] = {
          players: []
        };
      }

      if (obj[elem.team]) {
        obj[elem.team].players.push(elem);
      }
      return obj;
    }, {});
  }
};

export default dangerzoneService;
