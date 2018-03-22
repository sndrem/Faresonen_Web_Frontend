import React, { Component } from "react";
import {
  Grid,
  Dimmer,
  Loader,
  Segment,
  Statistic,
  Confirm
} from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import DangerzoneSearch from "../Components/Dangerzone/DangerzoneSearch";
import dangerzoneService from "../services/dangerzoneService";

class DangerzoneView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        eliteserien: [],
        obosligaen: []
      },
      loading: true,
      open: false
    };
  }

  componentDidMount() {
    if (!this.playersInLocalStorageExists()) {
      this.getPlayers(true);
    } else {
      this.showModal();
    }
  }

  getPlayers = (overwrite = false) =>
    axios
      .get("/statistics/allDangerzonePlayers")
      .then(data => {
        const { eliteserien, obosligaen } = data.data;
        if (overwrite) {
          this.saveToLocalStorage({
            eliteserien,
            obosligaen
          });
          this.setState({
            loading: false,
            data: {
              eliteserien,
              obosligaen
            }
          });
        }
        this.setState({
          loading: false,
          data: {
            eliteserien,
            obosligaen
          }
        });
      })
      .catch(err => {
        console.error(err);
      });

  getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

  showModal = () => {
    this.setState({ open: true });
  };

  hideModal = () => {
    this.setState({ open: false });
  };

  handleCancel = () => {
    const { eliteserien, obosligaen } = JSON.parse(
      localStorage.getItem("players")
    );
    this.setState({
      data: {
        eliteserien,
        obosligaen
      },
      loading: false
    });
    this.hideModal();
  };

  handleConfirm = () => {
    this.getPlayers(true);
    this.hideModal();
  };

  playersInLocalStorageExists = () => localStorage.getItem("players") !== null;

  saveToLocalStorage = players => {
    const updatedPlayers = players;
    updatedPlayers.lastUpdated = new Date();
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
  };

  render() {
    const { eliteserien, obosligaen } = this.state.data;
    const { lastUpdated } = this.getFromLocalStorage("players");
    return (
      <div>
        <FaresoneMenu />
        <Grid columns={1}>
          <Grid.Column>
            <Segment>
              <Dimmer active={this.state.loading}>
                <Loader>Henter spiller for Eliteserien og OBOS-ligaen</Loader>
              </Dimmer>
              <Confirm
                open={this.state.open}
                header={`Sist oppdatert: ${moment(lastUpdated).fromNow()}`}
                content="Det er allerede lastet ned spillere for faresonen. Ønsker du å laste ned oppdaterte spillere?"
                cancelButton="Nææh, dropp det"
                confirmButton="Ja, kjør på!"
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />
              <Statistic.Group widths="two">
                <Statistic>
                  <Statistic.Value>{eliteserien.length}</Statistic.Value>
                  <Statistic.Label>Eliteserie-spillere</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{obosligaen.length}</Statistic.Value>
                  <Statistic.Label>OBOSliga-spillere</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Segment>
          </Grid.Column>
        </Grid>
        <DangerzoneSearch
          players={{
            eliteserien: dangerzoneService.groupPlayersArrayResponse(
              this.state.data.eliteserien
            ),
            obosligaen: dangerzoneService.groupPlayersArrayResponse(
              this.state.data.obosligaen
            )
          }}
          getPlayers={this.getPlayers}
        />
      </div>
    );
  }
}

export default DangerzoneView;
