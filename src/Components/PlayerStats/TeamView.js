import React from "react";
import PropTypes from "prop-types";

const TeamView = ({team}) => <h1>{team.name}</h1>;
TeamView.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default TeamView;
