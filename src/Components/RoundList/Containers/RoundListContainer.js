import React, { Component } from "react";
import axios from "axios";
import RoundList from "../RoundList";

class RoundListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        rounds: [],
        leagueName: ""
      },
      loading: true
    };
  }
  componentDidMount() {
    const { tournamentId, seasonId } = this.props;
    this.getRounds(tournamentId, seasonId);
  }

  componentWillReceiveProps(nextProps) {
    const { tournamentId, seasonId } = nextProps;
    this.getRounds(tournamentId, seasonId);
  }

  getRounds = (tournamentId, seasonId) => {
    axios
      .get(`/rounds/${tournamentId}/${seasonId}`)
      .then(data => {
        this.setState({
          data: { rounds: data.data.round || [] },
          loading: false
        });
      })
      .catch(() =>
        this.setState({
          data: {
            rounds: []
          },
          loading: false
        })
      );
  };
  render() {
    const { rounds } = this.state.data;
    const { tournamentId, seasonId, leagueName } = this.props;
    return (
      <RoundList
        rounds={rounds}
        leagueName={leagueName}
        loading={this.state.loading}
        tournamentId={tournamentId}
        seasonId={seasonId}
      />
    );
  }
}
export default RoundListContainer;
