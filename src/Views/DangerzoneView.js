import React, { Component } from "react";
import { Grid, Dimmer, Loader, Segment, Confirm } from "semantic-ui-react";
import axios from "axios";
import moment from "moment";
import openSocket from "socket.io-client";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import DangerzoneSearch from "../Components/Dangerzone/DangerzoneSearch";
import DangerZoneAccumulator from "../Components/Dangerzone/DangerZoneAccumulator";
import dangerzoneService from "../services/dangerzoneService";
import DangerzoneStatistics from "../Components/Dangerzone/DangerzoneStatistics";
import tools from "../Tools/tools";
import "./DangerzoneView.css";

const socket = openSocket();

class DangerzoneView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        eliteserien: [],
        obosligaen: [],
        events: []
      },
      loading: true,
      open: false,
      socketConnected: false
    };
  }

  componentDidMount() {
    if (
      !this.playersInLocalStorageExists() ||
      this.localStoragePlayersIsEmpty()
    ) {
      this.getPlayers(true);
    } else {
      this.showModal();
    }
    this.setupSocket();
  }

  // componentWillUnmount() {
  //   socket.close();
  // }

  setupSocket = () => {
    console.log("Setting up socket");
    socket.on("connect", () => {
      console.log("Socket connected...");
      this.setState({ socketConnected: true });
    });

    socket.on("disconnect", () => {
      this.setState({ socketConnected: false });
    });

    socket.on("data", data => {
      this.setState({ socketConnected: true });
      const merged = this.state.data.eliteserien.concat(
        this.state.data.obosligaen
      );
      const events = data.events.filter(event => {
        if (event && event.person1) {
          const personId = tools.extractPersonId(event.person1["@uri"]);
          if (personId > -1) {
            const found = merged.find(p => p.id === personId);
            if (found) {
              return true;
            }
          }
        }
        return false;
      });
      this.setState({
        data: {
          ...this.state.data,
          events
        }
      });
    });
  };

  setDefaultState = (eliteserien, obosligaen) => {
    this.setState({
      loading: false,
      data: {
        eliteserien,
        obosligaen,
        events: []
      }
    });
  };

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
          this.setDefaultState(eliteserien, obosligaen);
        }
        this.setDefaultState(eliteserien, obosligaen);
      })
      .catch(err => {
        console.error(err);
      });

  getFromLocalStorage = key => {
    const items = JSON.parse(localStorage.getItem(key));
    if (items) return items;

    return {
      eliteserien: [],
      obosligaen: [],
      lastUpdated: new Date()
    };
  };

  localStoragePlayersIsEmpty = () => {
    const { eliteserien, obosligaen } = this.getFromLocalStorage("players");
    return eliteserien.length <= 0 && obosligaen.length <= 0;
  };

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
        obosligaen,
        events: []
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

  formatPlayers = () => ({
    eliteserien: dangerzoneService.groupPlayersArrayResponse(
      this.state.data.eliteserien
    ),
    obosligaen: dangerzoneService.groupPlayersArrayResponse(
      this.state.data.obosligaen
    )
  });

  removePlayer = (player, leagueId) => {
    const found = this.state.data.eliteserien.find(
      p => p.id === parseInt(player.id, 10)
    );
    if (found) {
      const index = this.state.data[leagueId].indexOf(found);
      this.state.data[leagueId].splice(index, 1);
      this.saveToLocalStorage(this.state.data);
    }
  };

  removeEvent = event => {
    const index = this.state.data.events.indexOf(event.event);
    this.state.data.events.splice(index, 1);
    this.setState({
      data: {
        events: this.state.data.events,
        ...this.state.data
      }
    });
  };

  render() {
    const { eliteserien, obosligaen, events } = this.state.data;
    const { lastUpdated } = this.getFromLocalStorage("players");
    const players = this.formatPlayers();
    const { socketConnected } = this.state;

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
              <DangerzoneStatistics
                eliteserien={eliteserien.length}
                obosligaen={obosligaen.length}
                socketConnected={socketConnected}
              />
            </Segment>
          </Grid.Column>
        </Grid>
        <Grid centered columns={2}>
          <Grid.Column>
            <DangerzoneSearch players={players} getPlayers={this.getPlayers} />
          </Grid.Column>
          <Grid.Column>
            <DangerZoneAccumulator
              events={events}
              removePlayer={this.removePlayer}
              removeEvent={this.removeEvent}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default DangerzoneView;
