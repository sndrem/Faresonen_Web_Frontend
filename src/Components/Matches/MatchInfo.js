import React from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";
import "moment/locale/nb";
import events from "../../Tools/events";

const MatchInfo = ({
  status,
  matchName,
  stadium,
  startDate,
  startTime,
  channel,
  referee
}) => {
  let header = "";
  if (status && events.postponed.includes(status["@uri"])) {
    header = (
      <Item.Header>
        UTSATT: {matchName}, {stadium}
      </Item.Header>
    );
  } else {
    header = (
      <Item.Header>
        {matchName}, {stadium}
      </Item.Header>
    );
  }
  return (
    <Item>
      <Item.Content>
        {header}
        <Item.Meta>
          {startDate} - Avspark kl.
          {startTime} på {channel}
        </Item.Meta>
        {referee && (
          <Item.Meta className="float-right">
            Dommer:
            {referee}
          </Item.Meta>
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
