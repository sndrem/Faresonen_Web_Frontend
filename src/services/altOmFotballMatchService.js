import axios from "axios";

class AltOmFotballMatchService {
  static getMatches = (tournamentId, seasonId) =>
    new Promise((resolve, reject) => {
      axios
        .get(`/matches/${tournamentId}/${seasonId}`)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });

  static getOnlyNotDoneMatches = (tournamentId, seasonId) => {
    // const self = this.a; // eslint-disable-line
    return new Promise((resolve, reject) => {
      axios
        .get(`/matches/${tournamentId}/${seasonId}`)
        .then(data => {
          if (data.data.match) {
            const filtered = this.filterNotDoneMatches(data.data.match);
            resolve(filtered);
          } else {
            resolve([]);
          }
        })
        .catch(err => reject(err));
    });
  };

  static filterNotDoneMatches = matches =>
    matches.filter(match => match.confirmed !== "true");

  static splitNames = (name, delimiter) => {
    if (name) return name.split(delimiter);
    return name;
  };

  static getChannelName = (allChannels, channelId) => {
    if (!allChannels) throw new Error("Please provide a list of channels");
    if (allChannels.length === 0) return "Laster... ";
    if (!channelId) throw new Error("Please provide a channelId");

    const channelFound = allChannels.find(
      channel => parseInt(channel.value, 10) === channelId
    );
    if (!channelFound)
      return `Kanal for ID: ${channelId} ble ikke funnet. Du kan legge til en kanal med den ID'en i admin-menyen`;

    return channelFound.name;
  };
}

export default AltOmFotballMatchService;
