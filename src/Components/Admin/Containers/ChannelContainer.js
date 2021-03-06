import React, {Component} from "react";
import {Grid, Header} from "semantic-ui-react";
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
    this.deleteChannel = this.deleteChannel.bind(this);
    this.editChannel = this.editChannel.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getChannels();
  }

  getChannels = () => {
    this.service.getChannels(this.processChannels);
  };

  processChannels = channels =>
    this.setState(prevState => ({
      ...prevState,
      channels: this.sortChannels(channels),
      loading: false
    }));

  sortChannels = channels =>
    channels.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));

  addChannel = () => {
    this.service.addChannel(this.state.selectedChannel).then(data => {
      this.setState({message: data.message});
      this.resetForm();
    });
  };

  handleChange = (name, value, valid) =>
    this.setState(prevState => ({
      ...prevState,
      selectedChannel: {
        ...prevState.selectedChannel,
        [name]: value
      },
      valid
    }));

  resetForm = () =>
    this.setState(prevState => ({
      ...prevState,
      selectedChannel: {
        name: "",
        value: "1"
      },
      valid: false
    }));

  editChannel = selectedChannel =>
    this.setState(prevState => ({
      ...prevState,
      selectedChannel,
      valid: true
    }));

  deleteChannel = channelId => {
    if (!channelId) throw new Error("Cannot delete a channel without a key");
    this.service.removeChannel(channelId);
  };

  render() {
    const {selectedChannel, valid, message, channels, loading} = this.state;
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
          <EditChannels
            channels={channels}
            editChannel={this.editChannel}
            deleteChannel={this.deleteChannel}
            loading={loading}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
export default ChannelContainer;
