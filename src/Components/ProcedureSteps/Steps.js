import React, { Component } from 'react';
import { Icon, Step } from 'semantic-ui-react';

class Steps extends Component {
	render() {
		return (
			<Step.Group>
			    <Step active>
			      <Icon name='checkmark' />
			      <Step.Content>
			        <Step.Title>Velg serie</Step.Title>
			        <Step.Description>Velg ønsket serie</Step.Description>
			      </Step.Content>
			    </Step>

			    <Step>
			      <Icon name='print' />
			      <Step.Content>
			        <Step.Title>Print</Step.Title>
			        <Step.Description>Ctrl + P for å printe lefsen</Step.Description>
			      </Step.Content>
			    </Step>

			    <Step>
			      <Icon name='cocktail' />
			      <Step.Content>
			        <Step.Title>Bra jobbet</Step.Title>
			        <Step.Description>Ta deg en pause, det har du fortjent!</Step.Description>
			      </Step.Content>
			    </Step>
			</Step.Group>
		)
	}
}

export default Steps;