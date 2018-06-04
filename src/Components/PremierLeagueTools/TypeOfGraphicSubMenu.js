import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import PropTypes from "prop-types";

class TypeOfGraphicSubMenu extends Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick = (event, props) => {
    this.props.updateActiveItem(props.name);
  };

  render() {
    const { activeItem } = this.props;
    return (
      <Menu>
        <Menu.Item
          name="liveinfo"
          active={activeItem === "liveinfo"}
          onClick={this.handleItemClick}
          link
        >
          Liveinfo
        </Menu.Item>

        <Menu.Item
          name="S18Teasesuper"
          active={activeItem === "S18Teasesuper"}
          onClick={this.handleItemClick}
          link
        >
          S18 - Teasesuper
        </Menu.Item>
      </Menu>
    );
  }
}

TypeOfGraphicSubMenu.propTypes = {
  activeItem: PropTypes.string.isRequired,
  updateActiveItem: PropTypes.func.isRequired
};

export default TypeOfGraphicSubMenu;
