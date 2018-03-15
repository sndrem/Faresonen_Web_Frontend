import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

function FaresoneMenu() {
  return (
    <div className="no-print">
      <h1>Faresonen</h1>
      <Menu>
        <Link to="/">
          <Menu.Item name="home">Hjem</Menu.Item>
        </Link>
        <Link to="/dangerzone">
          <Menu.Item name="dangerzone">Faresonen</Menu.Item>
        </Link>
      </Menu>
    </div>
  );
}

export default FaresoneMenu;
