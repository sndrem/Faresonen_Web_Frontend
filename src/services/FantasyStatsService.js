import axios from "axios";

const FantasyStatsService = {
  getMostSelectedPlayers(limit) {
    return new Promise((resolve, reject) => {
      axios
        .get("/fantasy/players")
        .then(data => {
          const selectedPlayers = data.data
            .sort((a, b) => {
              const selectA = parseFloat(a.selected_by_percent);
              const selectB = parseFloat(b.selected_by_percent);
              if (selectA > selectB) return -1;
              if (selectA === selectB) return 0;
              if (selectA < selectB) return 1;
              throw new Error(
                "Could not compute sorting order for most selected players"
              );
            })
            .filter(player => player.selected_by_percent !== "0.0")
            .slice(0, limit);
          resolve(selectedPlayers);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getMostExpensivePlayer(limit) {
    return new Promise((resolve, reject) => {
      axios
        .get("/fantasy/players")
        .then(data => {
          const selectedPlayers = data.data
            .sort((a, b) => {
              if (a.now_cost > b.now_cost) return -1;
              if (a.now_cost === b.now_cost) return 0;
              if (a.now_cost < b.now_cost) return 1;
              throw new Error(
                "Could not compute sorting order for most expensive players"
              );
            })
            .slice(0, limit);
          resolve(selectedPlayers);
        })
        .catch(err => {
          console.warn(err);
          reject(err);
        });
    });
  }
};

export default FantasyStatsService;
