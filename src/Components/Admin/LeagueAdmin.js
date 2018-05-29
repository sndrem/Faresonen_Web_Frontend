import React, { Component } from "react";
import { Button, Segment, Divider, Menu } from "semantic-ui-react";
import firebaseConfig from "../../databaseConfig/firebaseConfig";
import LeaguesContainer from "./Containers/LeaguesContainer";
import ColorContainer from "./Containers/ColorContainer";

class LeagueAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeItem: "leagues",
      menuComponents: {
        leagues: <LeaguesContainer />,
        colors: <ColorContainer />
      }
    };
    this.logOut = this.logOut.bind(this);
  }

  getMenuComponent = name => {
    const component = this.state.menuComponents[name];
    if (!component) throw new Error(`Menu component not found for id: ${name}`);
    return component;
  };

  logOut = e => {
    e.preventDefault();
    firebaseConfig.auth().signOut();
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    const menuComponent = this.getMenuComponent(activeItem);
    return (
      <Segment>
        <p>
          Dette er admin-sidene til Faresonen. Her kan du legge til og fjerne
          ligaer.
        </p>
        <Menu tabular>
          <Menu.Item
            name="leagues"
            active={activeItem === "leagues"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="colors"
            active={activeItem === "colors"}
            onClick={this.handleItemClick}
          />
        </Menu>
        <Button onClick={this.logOut}>Logg ut</Button>
        <Divider />
        {menuComponent}
      </Segment>
    );
  }
}
export default LeagueAdmin;
