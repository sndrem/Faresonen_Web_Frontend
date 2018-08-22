import React from "react";
import PropTypes from "prop-types";
import { Grid, Icon } from "semantic-ui-react";

const EditChannels = ({ channels, loading, editChannel, deleteChannel }) => {
  return loading ? (
    <p>Henter kanaler...</p>
  ) : (
    <Grid
      style={{
        maxHeight: "400px",
        overflowY: "scroll"
      }}
      columns={2}
    >
      {channels.map(channel => {
        return (
          <Grid.Column key={channel.value}>
            <p>
              <b>{channel.name}</b> ({channel.value})
            </p>
            <div>
              <span
                role="button"
                tabIndex={0}
                onClick={() => {
                  editChannel(channel);
                }}
              >
                <Icon name="edit" />
                Rediger
              </span>
              <span
                role="button"
                tabIndex={0}
                onClick={() => deleteChannel(channel.value)}
              >
                <Icon name="delete" />
                Fjern
              </span>
            </div>
          </Grid.Column>
        );
      })}
    </Grid>
  );
};

EditChannels.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  editChannel: PropTypes.func.isRequired,
  deleteChannel: PropTypes.func.isRequired
};
export default EditChannels;
