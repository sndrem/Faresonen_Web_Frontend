import EliteserieImage from "../assets/images/eliteserien.png";
import ObosligaenImage from "../assets/images/obosligaen.png";
import PremierLeagueImage from "../assets/images/premierleague.png";

export default {
  leagues: [
    {
      name: "Eliteserien",
      tournamentId: 1,
      seasonId: 340,
      image: EliteserieImage,
      active: true
    },
    {
      name: "OBOS-ligaen",
      tournamentId: 2,
      seasonId: 340,
      image: ObosligaenImage,
      active: true
    },
    {
      name: "Premier League",
      tournamentId: 230,
      seasonId: 340,
      image: PremierLeagueImage,
      active: false
    }
  ]
};
