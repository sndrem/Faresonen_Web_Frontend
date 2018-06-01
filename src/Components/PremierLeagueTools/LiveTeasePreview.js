import React from "react";
import PropTypes from "prop-types";
import { TextArea, Grid, Header, Segment } from "semantic-ui-react";
import altOmFotballMatchService from "../../services/altOmFotballMatchService";

const LiveTeasePreview = props => {
  return (
    <Segment>
      <Header as="h3">Preview</Header>
      <Grid columns={2}>
        <Grid.Column>
          {props.selectedMatch ? <p>Kamp valgt: {props.selectedMatch}</p> : ""}
          {props.matchTimeText && props.matchTime ? (
            <p>
              Fritekst: {props.matchTimeText} {props.matchTime}
            </p>
          ) : (
            ""
          )}
          {props.channels && props.channels.length > 0 ? (
            <p>
              Kanal(er):{" "}
              {props.channels
                .map(channel =>
                  altOmFotballMatchService.getChannelName(
                    props.allChannels,
                    channel
                  )
                )
                .join(",")}
            </p>
          ) : (
            ""
          )}
          {props.homeColor && (
            <p>
              Farge hjemmelag:{" "}
              <span
                style={{ background: props.findColor(props.homeColor).hex }}
              >
                {props.findColor(props.homeColor).text}
              </span>
            </p>
          )}

          {props.awayColor && (
            <p>
              Farge bortelag:{" "}
              <span
                style={{ background: props.findColor(props.awayColor).hex }}
              >
                {props.findColor(props.awayColor).text}
              </span>
            </p>
          )}
        </Grid.Column>
        <Grid.Column>
          <TextArea
            style={{ width: "100%", color: "#298aef" }}
            autoHeight
            value={props.script}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

LiveTeasePreview.propTypes = {
  selectedMatch: PropTypes.string.isRequired,
  matchTimeText: PropTypes.string.isRequired,
  matchTime: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.number).isRequired,
  findColor: PropTypes.func.isRequired,
  allChannels: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  script: PropTypes.string.isRequired,
  awayColor: PropTypes.string.isRequired,
  homeColor: PropTypes.string.isRequired
};

LiveTeasePreview.defaultProps = {
  awayColor: null,
  homeColor: null
};

export default LiveTeasePreview;
