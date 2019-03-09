import React from "react";
import PropTypes from "prop-types";
import { Icon, Step } from "semantic-ui-react";

const RoundSteps = ({ league, round }) => (
  <Step.Group className="no-print">
    <Step completed>
      <Icon name="checkmark" />
      <Step.Content>
        <Step.Title>Liga valgt</Step.Title>
        <Step.Description>Du har valgt {league}</Step.Description>
      </Step.Content>
    </Step>

    <Step completed>
      <Icon name="checkmark" />
      <Step.Content>
        <Step.Title>Runde valgt</Step.Title>
        <Step.Description>Du har valgt runde {round}</Step.Description>
      </Step.Content>
    </Step>

    <Step>
      <Icon name="print" />
      <Step.Content>
        <Step.Title>Print</Step.Title>
        <Step.Description>Ctrl + P for å printe lefsen</Step.Description>
      </Step.Content>
    </Step>

    <Step>
      <Icon name="cocktail" />
      <Step.Content>
        <Step.Title>Bra jobbet</Step.Title>
        <Step.Description>Ta deg en velfortjent pause!</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
);

RoundSteps.propTypes = {
  round: PropTypes.number.isRequired,
  league: PropTypes.string.isRequired
};

export default RoundSteps;
