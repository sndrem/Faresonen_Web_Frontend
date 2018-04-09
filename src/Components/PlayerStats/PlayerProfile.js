import React, { Component } from "react";
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
  points
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
            {name} {inDreamTeam ? <Icon name="star" color="yellow" /> : ""}
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
export default PlayerProfile;
