import React from "react";
import PropTypes from "prop-types";
import {TextArea, Grid, Header, Segment} from "semantic-ui-react";
import altOmFotballMatchService from "../../services/altOmFotballMatchService";

const LiveTeasePreview = ({
  allChannels,
  selectedMatch,
  matchTime,
  matchTimeText,
  channels,
  homeColor,
  findColor,
  awayColor,
  script
}) => (
  <Segment>
    <Header as="h3">Preview</Header>
    <Grid columns={2}>
      <Grid.Column>
        {selectedMatch ? (
          <p>
            Kamp valgt:
            {selectedMatch}
          </p>
        ) : (
          ""
        )}
        {matchTimeText && matchTime ? (
          <p>
            Fritekst: 
            {" "}
            {matchTimeText} 
            {" "}
            {matchTime}
          </p>
        ) : (
          ""
        )}
        {channels && channels.length > 0 ? (
          <p>
            Kanal(er):
            {" "}
            {channels
              .map(channel =>
                altOmFotballMatchService.getChannelName(allChannels, channel)
              )
              .join(",")}
          </p>
        ) : (
          ""
        )}
        {homeColor && (
          <p>
            Farge hjemmelag:
            {" "}
            <span style={{background: findColor(homeColor).hex}}>
              {findColor(homeColor).text}
            </span>
          </p>
        )}

        {awayColor && (
          <p>
            Farge bortelag:
            {" "}
            <span style={{background: findColor(awayColor).hex}}>
              {findColor(awayColor).text}
            </span>
          </p>
        )}
      </Grid.Column>
      <Grid.Column>
        <TextArea
          style={{width: "100%", color: "#298aef"}}
          autoHeight
          value={script}
        />
      </Grid.Column>
    </Grid>
  </Segment>
);

LiveTeasePreview.propTypes = {
  selectedMatch: PropTypes.string.isRequired,
  matchTimeText: PropTypes.string.isRequired,
  matchTime: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.number).isRequired,
  findColor: PropTypes.func,
  allChannels: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  script: PropTypes.string.isRequired,
  awayColor: PropTypes.string,
  homeColor: PropTypes.string
};

LiveTeasePreview.defaultProps = {
  awayColor: null,
  homeColor: null,
  findColor: () => {}
};

export default LiveTeasePreview;
