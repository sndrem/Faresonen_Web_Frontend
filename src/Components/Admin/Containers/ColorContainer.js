import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import NewColorForm from "../NewColorForm";

class ColorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: true
    };
  }
  render() {
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Header as="h3">Legg til ny farge</Header>
          <NewColorForm />
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Rediger farger</Header>
        </Grid.Column>
      </Grid>
    );
  }
}
export default ColorContainer;
