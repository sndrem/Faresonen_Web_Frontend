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
    const self = this.a;
    return new Promise((resolve, reject) => {
      axios
        .get(`/matches/${tournamentId}/${seasonId}`)
        .then(data => {
          if (data.data.match) {
            const filtered = self.filterDoneMatches(data.data.match);
            resolve(filtered);
          } else {
            resolve([]);
          }
        })
        .catch(err => reject(err));
    });
  },

  filterDoneMatches: matches =>
    matches.filter(match => match.confirmed !== "true"),

  splitNames: (name, delimiter) => {
    if (name) return name.split(delimiter);
    return name;
  },

  getChannelName: (allChannels, channelId) => {
    if (!allChannels) throw new Error("Please provide a list of channels");
    if (allChannels.length === 0) return "Laster... ";
    if (!channelId) throw new Error(`Please provide a channelId`);

    const channelFound = allChannels.find(
      channel => parseInt(channel.value, 10) === channelId
    );
    if (!channelFound)
      throw new Error(`Channel not found for ID: ${channelId}`);

    return channelFound.name;
  }
};

export default AltOmFotballMatchService;
