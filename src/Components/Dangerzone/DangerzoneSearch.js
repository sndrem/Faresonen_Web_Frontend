import React, { Component } from "react";
import { Grid, Form } from "semantic-ui-react";
import dangerzoneService from "../../services/dangerzoneService";

class DangerzoneSearch extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      data: {
        eliteserien: [],
        obosligaen: []
      },
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    const { eliteserien, obosligaen } = nextProps.players;
    this.setState({
      data: {
        eliteserien,
        obosligaen
      }
    });
  }

  formatPlayers = players => {
    if (players.length > 0) {
      return players.map(p => <li key={p.name}>{p.name}</li>);
    }
    return <li>Ingen spillere klare</li>;
  };

  createPlayerElements = players => {
    return players.map(p => <p key={p.name}>{p.name}</p>);
  };

  handleSearch = event => {
    const { value } = event.target;
    if (value) {
      const filteredEliteseriePlayers = this.state.data.eliteserien.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      this.setState({
        data: {
          eliteserien: filteredEliteseriePlayers
        }
      });
      console.log(filteredEliteseriePlayers);
    } else {
      this.props.getPlayers();
    }
  };

  render() {
    const { eliteserien } = this.state.data;

    // const eliteseriePlayerElements = dangerzoneService.groupPlayers(
    //   eliteserien
    // );
    const elements = this.createPlayerElements(eliteserien);

    return (
      <div>
        <Grid columns={1}>
          <Form>
            <Form.Field>
              <label>Søk etter spiller</label>
              <input
                placeholder="Fornavn/etternavn"
                onChange={this.handleSearch}
              />
            </Form.Field>
          </Form>
        </Grid>
        <Grid columns={2}>
          <Grid.Column>
            <h1>Eliteserien</h1>
            {elements}
          </Grid.Column>
          <Grid.Column>
            <h1>OBOSligaen</h1>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default DangerzoneSearch;
