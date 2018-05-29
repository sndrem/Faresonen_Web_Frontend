import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import { SketchPicker } from "react-color";

import premierLeagueDefaultColors from "../../Data/premierLeagueDefaultColors";
import FirebaseService from "../../services/FirebaseService";

class NewColorForm extends Component {
  constructor(props) {
    super(props);

    this.saveColor = this.saveColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  constructColorObject = (name, hex, number) => ({
    color: name,
    key: name,
    text: name,
    value: number,
    hex
  });

  saveColor = e => {
    e.preventDefault();
    const form = document.forms.colorForm;
    if (form.checkValidity()) {
      const { color: { key, hex, value } } = this.props;
      const colorObject = this.constructColorObject(key, hex, value);
      const colorKey = hex.replace("#", "");
      this.props.saveColor(colorKey, colorObject);
    }
  };

  handleChange = (e, { name, value }) => {
    const valid = this.formIsValid();
    this.props.handleChange(name, value, valid);
  };

  handleColorChange = color => {
    const valid = this.formIsValid();
    this.props.handleColorChange(color.hex, valid);
  };

  formIsValid = () => document.forms.colorForm.checkValidity();

  render() {
    const { color: { key, value, hex }, error, valid } = this.props;

    return (
      <div>
        {error ? (
          <Message warning>
            <Message.Header>Lagring av farge feilet</Message.Header>
            <p>{error.message}</p>
          </Message>
        ) : (
          ""
        )}
        <Form name="colorForm" onSubmit={this.saveColor}>
          <Form.Field>
            <label htmlFor="key">Navn på farge</label>
            <Form.Input
              placeholder="Navn på farge"
              required
              name="key"
              onChange={this.handleChange}
              value={key}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="value">Numerisk verdi (mappet mot grafikk)</label>
            <Form.Input
              type="number"
              required
              name="value"
              value={value}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="hex">Farge</label>
            <SketchPicker
              presetColors={premierLeagueDefaultColors}
              onChange={this.handleColorChange}
              color={hex}
            />
          </Form.Field>
          <Button color="green" disabled={!valid} type="submit">
            Lagre farge
          </Button>
          <Button color="teal" onClick={this.props.resetForm}>
            Resett form
          </Button>
        </Form>
      </div>
    );
  }
}
NewColorForm.propTypes = {
  saveColor: PropTypes.func.isRequired,
  color: PropTypes.shape({
    key: PropTypes.string.isRequired,
    hex: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  handleColorChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  }),
  valid: PropTypes.bool.isRequired,
  resetForm: PropTypes.func.isRequired
};

NewColorForm.defaultProps = {
  error: undefined
};
export default NewColorForm;
