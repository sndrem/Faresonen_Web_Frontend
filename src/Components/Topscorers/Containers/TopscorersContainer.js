import React, {Component} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Topscorers from "../Topscorers";

class TopscorersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        players: []
      },
      loading: true
    };
  }

  componentDidMount() {
    const {tournamentId} = this.props;
    axios
      .get(`/statistics/topscorers/${tournamentId}`)
      .then(data => {
        this.setState({
          data: {players: data.data.data.slice(0, 10)},
          loading: false
        });
      })
      .catch(() => this.setState({data: {players: []}}));
  }

  render() {
    return (
      <Topscorers
        players={this.state.data.players}
        loading={this.state.loading}
      />
    );
  }
}
TopscorersContainer.propTypes = {
  tournamentId: PropTypes.number.isRequired
};

export default TopscorersContainer;
