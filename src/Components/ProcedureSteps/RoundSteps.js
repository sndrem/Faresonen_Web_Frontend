import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Step } from "semantic-ui-react";

class RoundSteps extends Component {
	render() {
		return (
			<Step.Group className="no-print">
				<Step completed>
					<Icon name="checkmark" />
					<Step.Content>
						<Step.Title>Liga valgt</Step.Title>
						<Step.Description>
							Du har valgt {this.props.league}
						</Step.Description>
					</Step.Content>
				</Step>

				<Step completed>
					<Icon name="checkmark" />
					<Step.Content>
						<Step.Title>Runde valgt</Step.Title>
						<Step.Description>
							Du har valgt runde {this.props.round}
						</Step.Description>
					</Step.Content>
				</Step>

				<Step>
					<Icon name="print" />
					<Step.Content>
						<Step.Title>Print</Step.Title>
						<Step.Description>
							Ctrl + P for å printe lefsen
						</Step.Description>
					</Step.Content>
				</Step>

				<Step>
					<Icon name="cocktail" />
					<Step.Content>
						<Step.Title>Bra jobbet</Step.Title>
						<Step.Description>
							Ta deg en velfortjent pause!
						</Step.Description>
					</Step.Content>
				</Step>
			</Step.Group>
		);
	}
}

RoundSteps.propTypes = {
	round: PropTypes.number,
	league: PropTypes.string
};

export default RoundSteps;
