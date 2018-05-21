import firebaseConfig from "../databaseConfig/firebaseConfig";

class FirebaseService {
  // getLeagues = () => {
  //   return new Promise((resolve, reject) => {
  //     const leagueRef = firebaseConfig.database().ref("leagues");
  //     leagueRef
  //       .once("value")
  //       .then(data => {
  //         if (!data.val()) resolve([]);
  //         const leagues = this.mapLeaguesToList(data.val());
  //         resolve(leagues);
  //       })
  //       .catch(err => {
  //         reject(err);
  //       });
  //   });
  // };

  getLeagues = () => {
    return new Promise(resolve => {
      const leagueRef = firebaseConfig.database().ref("leagues");
      leagueRef.on("value", snapshot => {
        resolve(this.mapLeaguesToList(snapshot.val()));
      });
    });
  };

  updateLeague = ({ name, seasonId, tournamentId }) => {
    const leagueName = name.toLowerCase();
    firebaseConfig
      .database()
      .ref(`leagues/${leagueName}`)
      .set({
        name,
        active: true,
        seasonId,
        tournamentId
      });
  };

  saveLeagues = leagues => {
    Object.keys(leagues).forEach(key => {
      firebaseConfig
        .database()
        .ref(`leagues/${key}`)
        .set(leagues[key]);
    });
  };

  removeLeague = id => {
    firebaseConfig
      .database()
      .ref(`leagues/${id}`)
      .remove();
  };

  mapLeaguesToList = data => {
    if (!data) return [];
    return Object.keys(data).map(key => {
      return data[key];
    });
  };
}

export default FirebaseService;
