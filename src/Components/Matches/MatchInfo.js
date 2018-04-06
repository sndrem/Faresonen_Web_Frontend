import React from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";
import "moment/locale/nb";
import events from "../../Tools/events";

const MatchInfo = props => {
  let header = "";
  const { status } = props;
  if (status && events.postponed.includes(status["@uri"])) {
    header = (
      <Item.Header>
        UTSATT: {props.matchName}, {props.stadium}
      </Item.Header>
    );
  } else {
    header = (
      <Item.Header>
        {props.matchName}, {props.stadium}
      </Item.Header>
    );
  }
  return (
    <Item>
      <Item.Content>
        {header}
        <Item.Meta>
          {props.startDate} - Avspark kl. {props.startTime} på {props.channel}
        </Item.Meta>
        {props.referee && (
          <Item.Meta className="float-right">Dommer: {props.referee}</Item.Meta>
        )}
      </Item.Content>
    </Item>
  );
};

MatchInfo.propTypes = {
  status: PropTypes.shape({
    "@uri": PropTypes.string
  }),
  matchName: PropTypes.string.isRequired,
  stadium: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  referee: PropTypes.string.isRequired
};

MatchInfo.defaultProps = {
  status: {
    "@uri": ""
  }
};

export default MatchInfo;
