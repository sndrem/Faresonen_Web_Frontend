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
        players: players[team].players.filter(player => {
          const yellowCards = player.value1;
          if (yellowCards === 3 || (yellowCards % 2 !== 0 && yellowCards > 2)) {
            return true;
          }
          return false;
        })
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
  },

  groupPlayersArrayResponse(players) {
    return this.fromObjectToArray(this.groupPlayers(players));
  },

  fromObjectToArray(objects) {
    const list = [];
    Object.keys(objects).forEach(key => {
      list.push({ team: key, players: objects[key].players });
    });
    return list;
  }
};

export default dangerzoneService;
