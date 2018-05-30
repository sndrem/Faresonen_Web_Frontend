import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import NewChannelForm from "../NewChannelForm";
import EditChannels from "../EditChannels";
import FirebaseService from "../../../services/FirebaseService";

class ChannelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      selectedChannel: {
        name: "",
        value: "1"
      },
      valid: false,
      loading: true,
      message: ""
    };
    this.service = new FirebaseService();

    this.addChannel = this.addChannel.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getChannels();
  }

  getChannels = () => {
    this.service.getChannels(this.processChannels);
  };

  processChannels = channels => this.setState({ ...this.state, channels });

  addChannel = () => {
    console.log("Adding channel");
    console.log(this.state.selectedChannel);
    this.service.addChannel(this.state.selectedChannel).then(data => {
      this.setState({ message: data.message });
      this.resetForm();
    });
  };

  handleChange = (name, value, valid) =>
    this.setState({
      ...this.state,
      selectedChannel: {
        ...this.state.selectedChannel,
        [name]: value
      },
      valid
    });

  resetForm = () =>
    this.setState({
      ...this.state,
      selectedChannel: {
        name: "",
        value: "1"
      },
      valid: false
    });

  render() {
    const { selectedChannel, valid, message, channels } = this.state;
    return (
      <Grid columns={2}>
        <Grid.Column>
          <Header as="h3">Legg til kanal</Header>
          <NewChannelForm
            selectedChannel={selectedChannel}
            handleChange={this.handleChange}
            addChannel={this.addChannel}
            resetForm={this.resetForm}
            valid={valid}
            message={message}
          />
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Rediger kanaler</Header>
          <EditChannels channels={channels} />
        </Grid.Column>
      </Grid>
    );
  }
}
export default ChannelContainer;
