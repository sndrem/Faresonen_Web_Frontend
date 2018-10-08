import React, {Component} from "react";
import {Button, Segment, Divider, Menu} from "semantic-ui-react";
import firebaseConfig from "../../databaseConfig/firebaseConfig";
import LeaguesContainer from "./Containers/LeaguesContainer";
import ColorContainer from "./Containers/ColorContainer";
import ChannelContainer from "./Containers/ChannelContainer";

class LeagueAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "ligaer",
      menuComponents: {
        ligaer: <LeaguesContainer />,
        farger: <ColorContainer />,
        kanaler: <ChannelContainer />
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

  handleItemClick = (e, {name}) => this.setState({activeItem: name});

  render() {
    const {activeItem} = this.state;
    const menuComponent = this.getMenuComponent(activeItem);
    return (
      <Segment>
        <p>Dette er admin-sidene til Faresonen.</p>
        <Menu tabular>
          <Menu.Item
            name="ligaer"
            active={activeItem === "ligaer"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="farger"
            active={activeItem === "farger"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="kanaler"
            active={activeItem === "kanaler"}
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
