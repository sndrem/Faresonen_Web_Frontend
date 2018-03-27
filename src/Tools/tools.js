import axios from "axios";
import teamColors from "../Data/teamColors";

const tools = {
  getChannelAndStadium(match) {
    return {
      channel: this.getChannel(match),
      stadium: this.getStadium(match)
    };
  },

  getChannel(match) {
    if (match.channel) {
      return axios.get(match.channel["@uri"]);
    }
    return null;
  },

  getStadium(match) {
    if (match.stadium) {
      return axios.get(match.stadium["@uri"]);
    }
    return null;
  },

  getDate(datetime) {
    return new Date(datetime).toLocaleDateString("no-NO");
  },

  getTime(datetime) {
    return new Date(datetime).toLocaleTimeString("no-NB");
  },

  getTableColors(leagueId) {
    const data = {
      greens: [],
      reds: []
    };

    switch (leagueId) {
      case 1:
        data.greens = [0, 1, 2];
        data.reds = [14, 15];
        return data;
      case 230:
        data.greens = [0, 1, 2, 3];
        data.reds = [17, 18, 19];
        return data;
      default:
        return data;
    }
  },

  getTeamColors(teamName) {
    if (!teamName) throw new Error("You must provide a team name");
    const underscoreName = teamName.replace(/\s/g, "_");
    const colors = teamColors[underscoreName];
    if (colors) return colors;

    throw new Error(
      `Could not find matching colors for ${teamName}. Update teamColors.js with the correct team name and colors`
    );
  },

  getPersonData(personUrl) {
    return axios.get(personUrl);
  },

  getMultiplePersonData(promises, events) {
    return new Promise((resolve, reject) => {
      axios
        .all(promises)
        .then(data => {
          const players = data.map((p, index) => {
            return {
              player: p.data,
              event: events[index]
            };
          });
          resolve(players);
        })
        .catch(err => reject(err));
    });
  },

  getMemberships(promises) {
    return new Promise((resolve, reject) => {
      axios
        .all(promises)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },

  extractPersonId(url) {
    const regex = /people\/(\d+)\//g;
    const res = regex.exec(url);
    if (res && res.length > 1) return parseInt(res[1], 10);

    return -1;
  }
};

export default tools;
