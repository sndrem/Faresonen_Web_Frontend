import React from "react";
import { Icon, Step } from "semantic-ui-react";

function FirstSteps() {
	return (
		<Step.Group>
			<Step active>
				<Icon name="soccer" />
				<Step.Content>
					<Step.Title>Velg liga</Step.Title>
					<Step.Description>
						Hvilken liga skal du generere lefse for?
					</Step.Description>
				</Step.Content>
			</Step>

			<Step disabled>
				<Icon name="numbered list" />
				<Step.Content>
					<Step.Title>Velg runde</Step.Title>
					<Step.Description>
						Hvilken runde gjelder lefsen for?
					</Step.Description>
				</Step.Content>
			</Step>

			<Step disabled>
				<Icon name="print" />
				<Step.Content>
					<Step.Title>Print</Step.Title>
					<Step.Description>
						Ctrl + P for å printe lefsen
					</Step.Description>
				</Step.Content>
			</Step>

			<Step disabled>
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

export default FirstSteps;
