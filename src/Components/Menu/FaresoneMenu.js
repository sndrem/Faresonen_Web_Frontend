import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

class FaresoneMenu extends React.Component {
  constructor() {
    super();
    this.state = {
      activeItem: ""
    };
  }

  handleClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div className="no-print">
        <h1>Faresonen</h1>
        <Menu>
          <Menu.Item
            active={activeItem === "home"}
            as={Link}
            to="/"
            name="home"
            onClick={this.handleClick}
          >
            Hjem
          </Menu.Item>
          <Menu.Item
            active={activeItem === "dangerzone"}
            as={Link}
            to="/dangerzone"
            name="dangerzone"
            onClick={this.handleClick}
          >
            Faresonen
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default FaresoneMenu;
