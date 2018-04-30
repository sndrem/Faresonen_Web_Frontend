import React from "react";
import PropTypes from "prop-types";
import { TextArea, Grid, Header, Segment } from "semantic-ui-react";

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
            <p>Kanaler: {props.channels.map(channel => channel).join(",")}</p>
          ) : (
            ""
          )}
          <p>
            Farge hjemmelag:{" "}
            <span style={{ background: props.homeColor.hex }}>
              {props.homeColor.text}
            </span>
          </p>
          <p>
            Farge bortelag:{" "}
            <span style={{ background: props.awayColor.hex }}>
              {props.awayColor.text}
            </span>
          </p>
        </Grid.Column>
        <Grid.Column>
          <TextArea style={{ width: "100%" }} autoHeight value={props.script} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

LiveTeasePreview.propTypes = {
  selectedMatch: PropTypes.string.isRequired,
  matchTimeText: PropTypes.string.isRequired,
  matchTime: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.string).isRequired,
  script: PropTypes.string.isRequired
};

export default LiveTeasePreview;
