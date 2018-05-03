import axios from "axios";
import channels from "../Data/channels";

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
          const filtered = data.data.match.filter(this.filterDoneMatches);
          resolve(filtered);
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

  getChannelName: channelId => {
    if (!channelId) throw new Error(`Please provide a channelId`);

    const channelFound = channels.find(channel => channel.value === channelId);
    if (!channelFound)
      throw new Error(`Channel not found for ID: ${channelId}`);

    return channelFound.name;
  }
};

export default AltOmFotballMatchService;
