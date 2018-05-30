import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";

class NewChannelForm extends Component {
  constructor(props) {
    super(props);

    this.addChannel = this.addChannel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addChannel = e => {
    e.preventDefault();
    this.props.addChannel();
  };

  handleChange = (e, { name, value }) => {
    const valid = document.forms.channelForm.checkValidity();
    this.props.handleChange(name, value, valid);
  };

  render() {
    const { selectedChannel: { name, value }, valid, message } = this.props;
    return (
      <div>
        {message ? (
          <Message info>
            <Message.Header>Lagring av kanal</Message.Header>
            <p>{message}</p>
          </Message>
        ) : (
          ""
        )}
        <Form name="channelForm" onSubmit={this.addChannel}>
          <Form.Field>
            <label htmlFor="name">Kanalnavn</label>
            <Form.Input
              placeholder="TV 2"
              required
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="value">Numerisk verdi</label>
            <Form.Input
              type="number"
              min="1"
              required
              name="value"
              value={value}
              onChange={this.handleChange}
            />
          </Form.Field>

          <Button color="green" disabled={!valid} type="submit">
            Lagre/endre kanal
          </Button>
        </Form>
      </div>
    );
  }
}

NewChannelForm.propTypes = {
  selectedChannel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  addChannel: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default NewChannelForm;
