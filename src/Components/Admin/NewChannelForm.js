import React from "react";
import PropTypes from "prop-types";
import {Form, Button, Message} from "semantic-ui-react";

const NewChannelForm = ({
  selectedChannel: {name, value},
  valid,
  message,
  addChannel,
  handleChange
}) => {
  const handleChangeAndValidateForm = (e, {name, value}) => {
    const valid = document.forms.channelForm.checkValidity();
    handleChange(name, value, valid);
  };

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
      <Form name="channelForm" onSubmit={addChannel}>
        <Form.Field>
          <label htmlFor="name">Kanalnavn</label>
          <Form.Input
            placeholder="TV 2"
            required
            type="text"
            name="name"
            value={name}
            onChange={handleChangeAndValidateForm}
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
            onChange={handleChangeAndValidateForm}
          />
        </Form.Field>

        <Button color="green" disabled={!valid} type="submit">
          Lagre/endre kanal
        </Button>
      </Form>
    </div>
  );
};

NewChannelForm.propTypes = {
  selectedChannel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  addChannel: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default NewChannelForm;
