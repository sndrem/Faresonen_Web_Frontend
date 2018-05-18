import React from "react";
import { Menu } from "semantic-ui-react";

const FaresoneMenu = () => (
  <div className="no-print">
    <Menu inverted>
      <Menu.Item as={"a"} href="#/" name="home">
        Hjem
      </Menu.Item>
      <Menu.Item as={"a"} href="#/dangerzone" name="dangerzone">
        Faresonen
      </Menu.Item>
      <Menu.Item as="a" href="#/gigsports" name="gigsports">
        GIG Sports
      </Menu.Item>

      <Menu.Item as="a" href="#/fantasy" name="fantasy">
        Fantasy PL
      </Menu.Item>
      <Menu.Item as="a" href="#/fantasy/stats" name="fantasystats">
        Statistikk
      </Menu.Item>
      <Menu.Item as="a" href="#/premierleague" name="premierleague">
        Premier League-verktøy
      </Menu.Item>
      <Menu.Item position="right" as="a" href="#/admin" name="admin">
        Admin
      </Menu.Item>
      <Menu.Item position="right" as={"a"} href="#/about" name="about">
        Om
      </Menu.Item>
    </Menu>
  </div>
);

export default FaresoneMenu;
