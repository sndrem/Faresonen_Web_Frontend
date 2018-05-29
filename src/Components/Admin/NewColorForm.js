import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { SketchPicker } from "react-color";

import premierLeagueDefaultColors from "../../Data/premierLeagueDefaultColors";
import FirebaseService from "../../services/FirebaseService";

class NewColorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorName: "",
      colorNumber: 0,
      colorHex: premierLeagueDefaultColors[0],
      valid: false,
      error: ""
    };
    this.service = new FirebaseService();
    this.saveColor = this.saveColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  saveColor = e => {
    e.preventDefault();
    const form = document.forms.colorForm;
    if (form.checkValidity()) {
      const { colorName, colorHex, colorNumber } = this.state;
      this.service
        .addColor(colorHex, {
          color: colorName,
          key: colorName,
          text: colorName,
          value: parseInt(colorNumber, 10),
          hex: colorHex
        })
        .then(data => {
          this.setState({
            colorName: "",
            colorHex: "FFFFFF",
            colorNumber: 0
          });
        })
        .catch(error => {});
      console.log("Save color to db");
    }
  };

  handleChange = (e, { name, value }) => {
    const valid = document.forms.colorForm.checkValidity();
    this.setState({ [name]: value, valid });
  };

  handleColorChange = (color, event) => {
    this.setState({ colorHex: color.hex });
  };

  render() {
    const { colorName, colorNumber, colorHex, error } = this.state;

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
            <label htmlFor="colorName">Navn på farge</label>
            <Form.Input
              placeholder="Navn på farge"
              required
              name="colorName"
              onChange={this.handleChange}
              value={colorName}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="colorNumber">
              Numerisk verdi (mappet mot grafikk)
            </label>
            <Form.Input
              type="number"
              required
              name="colorNumber"
              value={colorNumber}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="colorHex">Farge</label>
            <SketchPicker
              presetColors={premierLeagueDefaultColors}
              onChange={this.handleColorChange}
              color={colorHex}
            />
          </Form.Field>
          <Button disabled={!this.state.valid} type="submit">
            Lagre farge
          </Button>
        </Form>
      </div>
    );
  }
}
export default NewColorForm;
