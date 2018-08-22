import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import NewColorForm from "../NewColorForm";
import EditColors from "../EditColors";
import FirebaseService from "../../../services/FirebaseService";

class ColorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      selectedColor: {
        key: "",
        value: "0",
        hex: "FFFFFF"
      },
      loading: true,
      valid: false
    };
    this.service = new FirebaseService();
    this.saveColor = this.saveColor.bind(this);
  }

  componentDidMount() {
    this.getColors();
  }

  getColors = () => {
    this.service.getColors(this.processColors);
  };

  setColor = color => this.setState({ selectedColor: color });

  saveColor = (key, color) => {
    if (!key) throw new Error("Cannot save color without a key");
    if (!color) throw new Error("Cant save an empty color object");
    return new Promise((resolve, reject) => {
      this.service
        .addColor(key, color)
        .then(data => {
          resolve(data);
          this.resetForm();
        })
        .catch(error => reject(error));
    });
  };

  deleteColor = key => {
    if (!key) throw new Error("Cannot delete color without a key");
    return new Promise((resolve, reject) => {
      this.service
        .removeColor(key)
        .then(data => {
          resolve(data);
          this.resetForm();
        })
        .catch(error => reject(error));
    });
  };

  resetForm = () => {
    this.setState({
      ...this.state,
      selectedColor: {
        key: "",
        value: "0",
        hex: "FFFFFF"
      }
    });
  };

  editColor = color => {
    this.setState({ selectedColor: color });
  };

  processColors = colors => this.setState({ colors, loading: false });

  handleChange = (name, value, valid) => {
    this.setState({
      ...this.state,
      valid,
      selectedColor: {
        ...this.state.selectedColor,
        [name]: value
      }
    });
  };

  handleColorChange = (hexColor, valid) => {
    this.setState({
      ...this.state,
      valid,
      selectedColor: {
        ...this.state.selectedColor,
        hex: hexColor
      }
    });
  };

  render() {
    const { colors, selectedColor, loading, valid } = this.state;

    return (
      <Grid columns={2}>
        <Grid.Column>
          <Header as="h3">Legg til ny farge</Header>
          <NewColorForm
            handleChange={this.handleChange}
            handleColorChange={this.handleColorChange}
            color={selectedColor}
            saveColor={this.saveColor}
            valid={valid}
            resetForm={this.resetForm}
          />
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Rediger farger</Header>
          <EditColors
            colors={colors}
            loading={loading}
            editColor={this.editColor}
            deleteColor={this.deleteColor}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
export default ColorContainer;
