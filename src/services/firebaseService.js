import firebaseConfig from "../databaseConfig/firebaseConfig";

class FirebaseService {
  constructor() {
    this.database = firebaseConfig.database();
  }
  getLeagues = cb => {
    const leagueRef = this.database.ref("leagues");
    leagueRef.on("value", snapshot => {
      cb(this.mapLeaguesToList(snapshot.val()));
    });
  };

  updateLeague = ({ name, seasonId, tournamentId }) => {
    const leagueName = name.toLowerCase();
    this.database.ref(`leagues/${leagueName}`).set({
      name,
      active: true,
      seasonId,
      tournamentId
    });
  };

  saveLeagues = leagues => {
    Object.keys(leagues).forEach(key => {
      this.database.ref(`leagues/${key}`).set(leagues[key], error => {
        if (!error) {
          console.log("League savings went okay");
        } else {
          console.warn("There was an error saving the leagues to the database");
          console.warn(error);
        }
      });
    });
  };

  removeLeague = id => {
    this.database.ref(`leagues/${id}`).remove();
  };

  addColor = (id, color) => {
    // Remove # from Hex color since Firebase won't accept # in keys
    return new Promise((resolve, reject) => {
      this.database.ref(`colors/${id.replace("#", "")}`).set(color, error => {
        if (!error) {
          resolve({ message: `${color.text} saved to database` });
        } else {
          reject({
            message: `${color.text} could not be saved to database`,
            error
          });
        }
      });
    });
  };

  mapLeaguesToList = data => {
    if (!data) return [];
    return Object.keys(data).map(key => {
      return data[key];
    });
  };
}

export default FirebaseService;
