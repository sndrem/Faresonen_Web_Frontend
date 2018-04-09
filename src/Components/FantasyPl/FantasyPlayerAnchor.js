import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import "./FantasyPlayerAnchor.css";

const FantasyPlayerAnchor = ({
  inDreamTeam,
  firstName,
  secondName,
  onClick
}) => (
  <a className="playerAnchor" role="button" onClick={onClick} tabIndex={0}>
    {inDreamTeam ? <Icon name="star" color="yellow" /> : ""}
    {firstName} {secondName} -{" "}
  </a>
);

FantasyPlayerAnchor.propTypes = {
  inDreamTeam: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  secondName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default FantasyPlayerAnchor;
