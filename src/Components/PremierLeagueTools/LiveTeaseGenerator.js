import React from "react";
import PropTypes from "prop-types";
import { Input, Dropdown } from "semantic-ui-react";
import channels from "../../Data/channels";

const LiveTeaseGenerator = ({ matches }) => {
  return (
    <div>
      <Dropdown
        placeholder="Velg kamp"
        fluid
        search
        selection
        options={matches}
      />
      <Input fluid placeholder="Avspark kl, I morgen fra kl." />
      <Dropdown
        placeholder="Velg kanal"
        fluid
        search
        selection
        options={channels}
      />
    </div>
  );
};

LiveTeaseGenerator.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired
};

export default LiveTeaseGenerator;
