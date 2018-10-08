// @flow
import axios from "axios";

const AltOmFotballMatchService = {
  getMatches: (tournamentId, seasonId) =>
    new Promise((resolve, reject) => {
      axios
        .get(`/matches/${tournamentId}/${seasonId}`)
        .then(data => resolve(data))
        .catch(err => reject(err));
    }),

  getOnlyNotDoneMatches: (tournamentId, seasonId) => {
    const self = this.a;
    return new Promise((resolve, reject) => {
      axios
        .get(`/matches/${tournamentId}/${seasonId}`)
        .then(data => {
          if (data.data.match) {
            const filtered = self.filterNotDoneMatches(data.data.match);
            resolve(filtered);
          } else {
            resolve([]);
          }
        })
        .catch(err => reject(err));
    });
  },

  filterNotDoneMatches: matches =>
    matches.filter(match => match.confirmed !== "true"),

  splitNames: (name: string, delimiter: string) => {
    if (name) return name.split(delimiter);
    return name;
  },

  getChannelName: (allChannels: Array<{}>, channelId: string | number) => {
    if (!allChannels) throw new Error("Please provide a list of channels");
    if (allChannels.length === 0) return "Laster... ";
    if (!channelId) throw new Error("Please provide a channelId");

    const channelFound = allChannels.find(
      channel => parseInt(channel.value, 10) === channelId
    );
    if (!channelFound)
      return `Kanal for ID: ${channelId} ble ikke funnet. Du kan legge til en kanal med den ID'en i admin-menyen`;

    return channelFound.name;
  }
};

export default AltOmFotballMatchService;
