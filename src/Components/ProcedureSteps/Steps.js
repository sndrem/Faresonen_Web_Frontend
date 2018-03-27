import React from "react";
import PropTypes from "prop-types";
import { Icon, Step } from "semantic-ui-react";

const Steps = props => (
  <Step.Group className="no-print">
    <Step completed>
      <Icon name="checkmark" />
      <Step.Content>
        <Step.Title>Liga valgt</Step.Title>
        <Step.Description>Du har valgt {props.league}</Step.Description>
      </Step.Content>
    </Step>

    <Step active>
      <Icon name="numbered list" />
      <Step.Content>
        <Step.Title>Velg runde</Step.Title>
        <Step.Description>Hvilken runde gjelder lefsen for?</Step.Description>
      </Step.Content>
    </Step>

    <Step disabled>
      <Icon name="print" />
      <Step.Content>
        <Step.Title>Print</Step.Title>
        <Step.Description>Ctrl + P for å printe lefsen</Step.Description>
      </Step.Content>
    </Step>

    <Step disabled>
      <Icon name="cocktail" />
      <Step.Content>
        <Step.Title>Bra jobbet</Step.Title>
        <Step.Description>Ta deg en velfortjent pause!</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
);

Steps.propTypes = {
  league: PropTypes.string.isRequired
};

export default Steps;
