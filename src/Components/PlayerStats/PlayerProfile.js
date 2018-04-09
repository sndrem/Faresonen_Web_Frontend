import React from "react";
import PropTypes from "prop-types";
import { Card, Image, Icon } from "semantic-ui-react";

const PlayerProfile = ({
  name,
  news,
  photo,
  chanceOfPlayingNextRound,
  inDreamTeam,
  cost,
  selectedBy,
  points,
  teamName
}) => {
  return (
    <div>
      <Card>
        <Image
          src={
            photo
              ? `http://platform-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p${photo.replace(
                  "jpg",
                  "png"
                )}`
              : ""
          }
        />
        <Card.Content>
          <Card.Header>
            {name}, {teamName}{" "}
            {inDreamTeam ? <Icon name="star" color="yellow" /> : ""}
          </Card.Header>
          <div>
            <Card.Description>
              <b>Pris: </b>£{cost / 10}
            </Card.Description>
            <Card.Description>
              <b>Poeng: </b>
              {points}
            </Card.Description>
            <Card.Description>
              <b>Valgt av: </b>
              {selectedBy}%
            </Card.Description>
            <Card.Description>
              <b>Skader: </b>
              {news ? `${news}` : "Ingen skader."}
            </Card.Description>
            {chanceOfPlayingNextRound ? (
              <Card.Description>
                <b>Sjanse for å spille neste runde:</b>{" "}
                {chanceOfPlayingNextRound}%
              </Card.Description>
            ) : (
              ""
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};
PlayerProfile.propTypes = {
  name: PropTypes.string,
  teamName: PropTypes.string,
  news: PropTypes.string,
  photo: PropTypes.string,
  chanceOfPlayingNextRound: PropTypes.number,
  inDreamTeam: PropTypes.bool,
  cost: PropTypes.number,
  selectedBy: PropTypes.string,
  points: PropTypes.number
};

PlayerProfile.defaultProps = {
  name: "",
  news: "",
  photo: "",
  chanceOfPlayingNextRound: -1,
  inDreamTeam: false,
  cost: -1,
  selectedBy: "",
  points: -1,
  teamName: ""
};
export default PlayerProfile;
