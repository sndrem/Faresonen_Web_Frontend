import React, { Component } from "react";
import firebaseConfig from "../../../databaseConfig/firebaseConfig";
import LogInAdmin from "../LogInAdmin";
import LeagueAdmin from "../LeagueAdmin";

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true
    };
  }

  componentDidMount() {
    this.authListener();
  }

  // Authentication listener
  authListener() {
    firebaseConfig.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return !this.state.user ? <LogInAdmin /> : <LeagueAdmin />;
  }
}
export default AdminContainer;
