import EliteserieImage from "../assets/images/eliteserien.png";
import ObosligaenImage from "../assets/images/obosligaen.png";
import PremierLeagueImage from "../assets/images/premierleague.png";

export default {
  leagues: [
    {
      name: "Eliteserien",
      tournamentId: 1,
      id: "1",
      seasonId: 340,
      image: EliteserieImage,
      active: true,
      activeseason: {
        "@uri": "http://api.tv2.no/sport/resources/seasons/340/",
      },
    },
    {
      name: "OBOS-ligaen",
      tournamentId: 2,
      id: "2",
      seasonId: 340,
      image: ObosligaenImage,
      active: true,
      activeseason: {
        "@uri": "http://api.tv2.no/sport/resources/seasons/340/",
      },
    },
    {
      name: "Premier League",
      tournamentId: 230,
      id: "230",
      seasonId: 340,
      image: PremierLeagueImage,
      active: false,
      activeseason: {
        "@uri": "http://api.tv2.no/sport/resources/seasons/339/",
      },
    },
  ],
};
