import React from "react";
import { Menu } from "semantic-ui-react";

const FaresoneMenu = () => (
  <div className="no-print">
    <h1>Faresonen</h1>
    <Menu>
      <Menu.Item as={"a"} href="#/" name="home">
        Hjem
      </Menu.Item>
      <Menu.Item as={"a"} href="#/dangerzone" name="dangerzone">
        Faresonen
      </Menu.Item>
      <Menu.Item as={"a"} href="#/about" name="about">
        Om
      </Menu.Item>
    </Menu>
  </div>
);

export default FaresoneMenu;
