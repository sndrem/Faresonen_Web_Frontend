import React, {useState} from "react";
import {Accordion, Icon} from "semantic-ui-react";

const AboutAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const {index} = titleProps;
    const newIndex = calculateNewIndex(index, activeIndex);

    setActiveIndex(newIndex);
  };

  const calculateNewIndex = (index, activeIndex) =>
    activeIndex === index ? -1 : index;

  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        Motivasjon
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <p>
          Motivasjonen til denne applikasjonen var å bli kvitt repeterende og
          kjedelig arbeid i forbindelse med forberedelser til FotballXtra.
        </p>
        <p>
          Ideen bak har hele tiden vært og få generert lefsen til FotballXtra
          med færrest mulige klikk. Fra første versjon av faresone-generatoren
          så dagens lys som Java-applikasjon i 2014 er dagens versjon oppdatert
          til å være web-basert. Det betyr at ny funksjonalitet kan komme ut
          fortere og alt man trenger er en nettleser for tilgang.
        </p>
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        Kan det legges til flere ligaer?
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        <p>
          Ja, det kan legges til flere ligaer. Alt man trenger er liga-id og
          sesong-id fra 
          {" "}
          <a href="http://www.altomfotball.no">altomfotball.no</a>
          . Foreløpig må det gjøres via Sindre Moldeklev, men i fremtiden kan
          det være det kan bli gjort av deg som bruker.
        </p>
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 2}
        index={2}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        Hvordan fungerer det?
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 2}>
        <p>
          Dataene hentes direkte fra samme kilde som Homla og andre systemer i
          TV 2. Vi kan dermed være sikre på at det vi bruker på luft også er det
          vi ser på sidene her.
        </p>

        <p>
          For Faresone-komponenten for bruk på sending så hentes de spillerne
          som er i faresonen ned og lagret i nettleseren. Dermed får man besjed
          dersom
        </p>
      </Accordion.Content>
    </Accordion>
  );
};

export default AboutAccordion;
