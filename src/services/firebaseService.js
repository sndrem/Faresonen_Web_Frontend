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

  getColors = cb => {
    const colorRef = this.database.ref("colors");
    colorRef.on("value", snapshot => {
      cb(this.mapLeaguesToList(snapshot.val()));
    });
  };

  addColor = (id, color) => {
    // Remove # from Hex color since Firebase won't accept # in keys
    return new Promise((resolve, reject) => {
      this.database
        .ref(`colors/${this.removeFirebaseSpecializedCharacters(id, "#")}`)
        .set(color, error => {
          if (!error) {
            resolve({ message: `${color.text} lagret til databasen` });
          } else {
            reject({
              message: `${color.text} kunne ikke bli lagret i databasen.`,
              error
            });
          }
        });
    });
  };

  removeFirebaseSpecializedCharacters = (ref, char) => ref.replace(char, "");

  removeColor = key =>
    new Promise((resolve, reject) => {
      this.database
        .ref(`colors/${this.removeFirebaseSpecializedCharacters(key, "#")}`)
        .remove()
        .then(data => resolve(data))
        .catch(err => reject(err));
    });

  addChannel = channel => {
    return new Promise((resolve, reject) => {
      this.database
        .ref(`channels/${channel.value}`)
        .set(channel)
        .then(() => resolve({ message: "Kanal lagret i database" }))
        .catch(error =>
          reject({ message: "Kanal kunne ikke lagres i databasen", error })
        );
    });
  };

  removeChannel = key =>
    new Promise((resolve, reject) => {
      this.database
        .ref(`channels/${key}`)
        .remove()
        .then(data => resolve(data))
        .catch(err => reject(err));
    });

  getChannels = cb => {
    this.database.ref("channels").on("value", snapshot => {
      cb(this.mapLeaguesToList(snapshot.val()));
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
