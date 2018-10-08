import React from "react";
import {Container} from "semantic-ui-react";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import NewUserContainer from "../Components/NewUser/Containers/NewUserContainer";

const NewUserView = () => (
  <Container>
    <FaresoneMenu />
    <NewUserContainer />
  </Container>
);

export default NewUserView;
