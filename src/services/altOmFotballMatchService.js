import axios from "axios";
import channels from "../Data/channels";
import FirebaseService from "../services/FirebaseService";

const service = new FirebaseService();

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

  getChannelName: channelId => {
    if (!channelId) throw new Error(`Please provide a channelId`);

    return new Promise(resolve => {
      service.getChannels(data => {
        const channelFound = data.find(
          channel => parseInt(channel.value, 10) === channelId
        );
        if (!channelFound)
          throw new Error(`Channel not found for ID: ${channelId}`);

        resolve(channelFound);
      });
    });
  }
};

export default AltOmFotballMatchService;
