import firebaseConfig from "../databaseConfig/firebaseConfig";

class FirebaseService {
  getLeagues = () => {
    return new Promise((resolve, reject) => {
      const leagueRef = firebaseConfig.database().ref("leagues");
      leagueRef
        .once("value")
        .then(data => {
          const leagues = this.mapLeaguesToList(data.val());
          resolve(leagues);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  mapLeaguesToList = data => {
    return Object.keys(data).map(key => {
      return data[key];
    });
  };
}

export default FirebaseService;
