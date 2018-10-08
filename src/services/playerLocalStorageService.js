const playerLocalStorageService = {
  getFromLocalStorage(key) {
    const items = JSON.parse(localStorage.getItem(key));
    if (items) return items;

    return {
      eliteserien: [],
      obosligaen: [],
      lastUpdated: new Date(),
    };
  },

  localStoragePlayersIsEmpty() {
    const {
      eliteserien,
      obosligaen,
    } = playerLocalStorageService.getFromLocalStorage("players");
    return eliteserien.length <= 0 && obosligaen.length <= 0;
  },

  playersInLocalStorageExists() {
    return localStorage.getItem("players") !== null;
  },

  saveToLocalStorage(players) {
    const updatedPlayers = players;
    updatedPlayers.lastUpdated = new Date();
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  },
};

export default playerLocalStorageService;
