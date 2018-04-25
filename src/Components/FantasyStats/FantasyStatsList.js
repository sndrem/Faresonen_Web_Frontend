import React from "react";
import { Header, List } from "semantic-ui-react";
import PropTypes from "prop-types";

const FantasyStatsList = props => (
  <div>
    <Header as="h2">{props.header}</Header>
    <List items={props.players} />
  </div>
);

FantasyStatsList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  header: PropTypes.string.isRequired
};

export default FantasyStatsList;
