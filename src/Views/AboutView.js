import React from "react";
import {Header} from "semantic-ui-react";
import FaresoneMenu from "../Components/Menu/FaresoneMenu";
import AboutAccordion from "../Components/Accordion/AboutAccordion";

const AboutView = () => (
  <div>
    <FaresoneMenu />
    <Header as="h1">Om</Header>
    <AboutAccordion />
  </div>
);

export default AboutView;
