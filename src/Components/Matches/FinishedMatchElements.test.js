import React from "react";
import { shallow, mount, render } from 'enzyme';
import '../../setupJest.js';
import FinishedMatchElements from './FinishedMatchElements';

const matchInfo = {
	name: 'Ranheim-Brann',
	events: {
		'@uri': ''
	}
}

const shallowOptions = {
	disableLifecycleMethods: true
}

function instantiateShallow(matchInfo) {
	return shallow(<FinishedMatchElements matchInfo={matchInfo} />);
}

function instatiateShallowWithOptions(matchInfo, options) {

	return shallow(<FinishedMatchElements matchInfo={matchInfo} />, options);
}

describe('<FinishedMatchElements />', () => {
	it('should return a list of the game name, split by -,;', () => {
		const elem = instatiateShallowWithOptions(matchInfo, shallowOptions);
		const matchNames = ['Ranheim-Brann', 'Ranheim,Brann', 'Ranheim;Brann'];
		expect(elem.instance().splitGameName(matchNames[0])).toEqual(['Ranheim', 'Brann']);
		expect(elem.instance().splitGameName(matchNames[1])).toEqual(['Ranheim', 'Brann']);
		expect(elem.instance().splitGameName(matchNames[2])).toEqual(['Ranheim', 'Brann']);
	})

	it('filters events correctly for home and away team', () => {
		const events = [
				  {
				    "@uri": "http://api.tv2.no/sport/resources/events/14315075/",
				    "eventCode": "C01D00,C01D04R02",
				    "eventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/eventtypes/3/"
				    },
				    "eventtime": "33",
				    "extendedeventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/extendedeventtypes/101/"
				    },
				    "goalsTeamA": "1",
				    "goalsTeamB": "0",
				    "groupId": "1502638452935",
				    "id": "14315075",
				    "match": {
				      "@uri": "http://api.tv2.no/sport/resources/matches/873944/"
				    },
				    "mml": "CF-PLR01-MAU-WHU-Q01E01-173302-LUKAKU-1-0",
				    "nifsId": "8009442",
				    "person1": {
				      "@uri": "http://api.tv2.no/sport/resources/people/227182/",
				      "birthday": "1993-05-13T00:00:00+02:00",
				      "birthplace": "Antwerpen",
				      "country": {
				        "@uri": "http://api.tv2.no/sport/resources/countries/6/"
				      },
				      "created": "1990-01-01T01:00:00+01:00",
				      "earlierTeams": "sept. 2013/14 Everton FC (på utlån)<br/> \r\n2012/13 West Bromwich Albion FC (på utlån)<br/>  \r\n2011-14 Chelsea FC<br/>\r\n2009-11 RSC Anderlecht",
				      "enetpulseId": "181276",
				      "firstname": "Romelu",
				      "height": "190",
				      "id": "227182",
				      "images": {
				        "@uri": "http://api.tv2.no/sport/resources/people/227182/images/"
				      },
				      "lastname": "Lukaku",
				      "memberships": {
				        "@uri": "http://api.tv2.no/sport/resources/people/227182/memberships/"
				      },
				      "nickname": "Romelu Menama Lukaku",
				      "nifsId": "47530",
				      "role": {
				        "@uri": "http://api.tv2.no/sport/resources/roles/4/"
				      },
				      "weight": "94"
				    },
				    "progId": "1222204",
				    "realTime": "2017-08-13T17:33:02+02:00",
				    "person2": {
				      "@uri": "http://api.tv2.no/sport/resources/people/79563/"
				    },
				    "team": {
				      "@uri": "http://api.tv2.no/sport/resources/teams/735/"
				    },
				    "text": "Debutanten leverer en strålende scoring foran sine nye fans! Rashford plukker opp en stygg tversover på egen halvdel, og setter full peis mot West Hams forsvar. En strøken pasning mot Lukaku slippes i akkurat riktig tid, og da er belgieren sikker i sin sak alene med Joe Hart. Herlig avslutning via stolpen, den betyr nok mye!",
				    "text2": "Baklengsmål West Ham Hart\r\nScoring Man. United Etablert angrep Direkte i mål\r\nScoring3",
				    "videoDistributed": "1",
				    "videoMobilProfileId": "2"
				  },
				  {
				    "@uri": "http://api.tv2.no/sport/resources/events/14315081/",
				    "eventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/eventtypes/31/"
				    },
				    "eventtime": "33",
				    "extendedeventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/extendedeventtypes/304/"
				    },
				    "goalsTeamA": "1",
				    "goalsTeamB": "0",
				    "groupId": "1502638452935",
				    "id": "14315081",
				    "match": {
				      "@uri": "http://api.tv2.no/sport/resources/matches/873944/"
				    },
				    "person1": {
				      "@uri": "http://api.tv2.no/sport/resources/people/227182/"
				    },
				    "realTime": "2017-08-13T17:33:02+02:00",
				    "team": {
				      "@uri": "http://api.tv2.no/sport/resources/teams/735/"
				    }
				  },
				  {
				    "@uri": "http://api.tv2.no/sport/resources/events/14315804/",
				    "eventCode": "C02D00,C02D04R03",
				    "eventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/eventtypes/3/"
				    },
				    "eventtime": "52",
				    "extendedeventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/extendedeventtypes/104/"
				    },
				    "goalsTeamA": "2",
				    "goalsTeamB": "0",
				    "groupId": "1502640728912",
				    "id": "14315804",
				    "match": {
				      "@uri": "http://api.tv2.no/sport/resources/matches/873944/"
				    },
				    "mml": "CF-PLR01-MAU-WHU-Q01E04-180912-LUKAKU-2-0",
				    "nifsId": "8009950",
				    "person1": {
				      "@uri": "http://api.tv2.no/sport/resources/people/227182/",
				      "birthday": "1993-05-13T00:00:00+02:00",
				      "birthplace": "Antwerpen",
				      "country": {
				        "@uri": "http://api.tv2.no/sport/resources/countries/6/"
				      },
				      "created": "1990-01-01T01:00:00+01:00",
				      "earlierTeams": "sept. 2013/14 Everton FC (på utlån)<br/> \r\n2012/13 West Bromwich Albion FC (på utlån)<br/>  \r\n2011-14 Chelsea FC<br/>\r\n2009-11 RSC Anderlecht",
				      "enetpulseId": "181276",
				      "firstname": "Romelu",
				      "height": "190",
				      "id": "227182",
				      "images": {
				        "@uri": "http://api.tv2.no/sport/resources/people/227182/images/"
				      },
				      "lastname": "Lukaku",
				      "memberships": {
				        "@uri": "http://api.tv2.no/sport/resources/people/227182/memberships/"
				      },
				      "nickname": "Romelu Menama Lukaku",
				      "nifsId": "47530",
				      "role": {
				        "@uri": "http://api.tv2.no/sport/resources/roles/4/"
				      },
				      "weight": "94"
				    },
				    "progId": "1222211",
				    "realTime": "2017-08-13T18:09:12+02:00",
				    "person2": {
				      "@uri": "http://api.tv2.no/sport/resources/people/79563/"
				    },
				    "team": {
				      "@uri": "http://api.tv2.no/sport/resources/teams/735/"
				    },
				    "text": "Hvilken debut for belgieren! Mkhitaryan svinger frisparket inn i feltet, hvor Lukaku river seg løs fra markeringen. Han er så voldsomt sterk i de duellene, og da kan han bare forlenge ballen i lengste hjørne. Hvilken herlig introduksjon på sin nye hjemmebane!",
				    "videoDistributed": "1",
				    "videoMobilProfileId": "2"
				  },
				  {
				    "@uri": "http://api.tv2.no/sport/resources/events/14315884/",
				    "eventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/eventtypes/31/"
				    },
				    "eventtime": "52",
				    "extendedeventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/extendedeventtypes/304/"
				    },
				    "goalsTeamA": "2",
				    "goalsTeamB": "0",
				    "groupId": "1502640728912",
				    "id": "14315884",
				    "match": {
				      "@uri": "http://api.tv2.no/sport/resources/matches/873944/"
				    },
				    "person1": {
				      "@uri": "http://api.tv2.no/sport/resources/people/227182/"
				    },
				    "realTime": "2017-08-13T18:09:12+02:00",
				    "team": {
				      "@uri": "http://api.tv2.no/sport/resources/teams/735/"
				    }
				  },
				  {
				    "@uri": "http://api.tv2.no/sport/resources/events/14316387/",
				    "eventCode": "C01D00,C01D04R03",
				    "eventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/eventtypes/3/"
				    },
				    "eventtime": "87",
				    "extendedeventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/extendedeventtypes/101/"
				    },
				    "goalsTeamA": "3",
				    "goalsTeamB": "0",
				    "groupId": "1502642676490",
				    "id": "14316387",
				    "match": {
				      "@uri": "http://api.tv2.no/sport/resources/matches/873944/"
				    },
				    "mml": "CF-PLR01-MAU-WHU-Q01E01-184345-MARTIAL-3-0",
				    "nifsId": "8010508",
				    "person1": {
				      "@uri": "http://api.tv2.no/sport/resources/people/277301/",
				      "birthday": "1995-12-05T00:00:00+01:00",
				      "birthplace": "Massy",
				      "country": {
				        "@uri": "http://api.tv2.no/sport/resources/countries/15/"
				      },
				      "created": "2012-11-20T15:49:17+01:00",
				      "earlierTeams": "2013-sept. -15 AS Monaco FC<br/>\r\n2009-13 Olympique Lyonnais<br/>\r\n2001-09 CO Les Ulis",
				      "enetpulseId": "413557",
				      "firstname": "Anthony",
				      "height": "181",
				      "id": "277301",
				      "images": {
				        "@uri": "http://api.tv2.no/sport/resources/people/277301/images/"
				      },
				      "lastname": "Martial",
				      "memberships": {
				        "@uri": "http://api.tv2.no/sport/resources/people/277301/memberships/"
				      },
				      "nickname": "Anthony Joran Martial",
				      "nifsId": "101270",
				      "role": {
				        "@uri": "http://api.tv2.no/sport/resources/roles/4/"
				      },
				      "weight": "76"
				    },
				    "progId": "1222220",
				    "realTime": "2017-08-13T18:43:45+02:00",
				    "person2": {
				      "@uri": "http://api.tv2.no/sport/resources/people/79563/"
				    },
				    "team": {
				      "@uri": "http://api.tv2.no/sport/resources/teams/735/"
				    },
				    "text": "Nedsablingen er komplett, West Ham får juling her! Vertene broderer seg herlig igjennom gjestenes forsvar på ett touch, og igjen er det Mkhitaryan som er nest sist på ballen. Førstetouchen til Martial sitter, og da banker han ballen inn bak Joe Hart. Imponerende det Manchester United driver med her!",
				    "text2": "Baklengsmål West Ham Hart\r\nScoring Man. United Etablert angrep Direkte i mål\r\nScoring2",
				    "videoDistributed": "1",
				    "videoMobilProfileId": "2"
				  },
				  {
				    "@uri": "http://api.tv2.no/sport/resources/events/14316388/",
				    "eventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/eventtypes/31/"
				    },
				    "eventtime": "87",
				    "extendedeventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/extendedeventtypes/304/"
				    },
				    "goalsTeamA": "3",
				    "goalsTeamB": "0",
				    "groupId": "1502642676490",
				    "id": "14316388",
				    "match": {
				      "@uri": "http://api.tv2.no/sport/resources/matches/873944/"
				    },
				    "person1": {
				      "@uri": "http://api.tv2.no/sport/resources/people/277301/"
				    },
				    "realTime": "2017-08-13T18:43:45+02:00",
				    "team": {
				      "@uri": "http://api.tv2.no/sport/resources/teams/735/"
				    }
				  },
				  {
				    "@uri": "http://api.tv2.no/sport/resources/events/14316420/",
				    "eventCode": "C03D00,C03D04R02",
				    "eventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/eventtypes/3/"
				    },
				    "eventtime": "90",
				    "extendedeventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/extendedeventtypes/102/"
				    },
				    "goalsTeamA": "4",
				    "goalsTeamB": "0",
				    "groupId": "1502642910000",
				    "id": "14316420",
				    "match": {
				      "@uri": "http://api.tv2.no/sport/resources/matches/873944/"
				    },
				    "mml": "CF-PLR01-MAU-WHU-Q01E02-184621-POGBA-4-0",
				    "nifsId": "8010552",
				    "person1": {
				      "@uri": "http://api.tv2.no/sport/resources/people/255800/",
				      "birthday": "1993-03-15T00:00:00+01:00",
				      "birthplace": "Lagny-sur-Marne",
				      "country": {
				        "@uri": "http://api.tv2.no/sport/resources/countries/15/"
				      },
				      "created": "2011-02-19T17:42:31+01:00",
				      "earlierTeams": "2012-16 Juventus FC<br/>\r\n2009-12 Manchester United FC<br/>\r\n2007-09 Le Havre FC<br/>\r\n2006/07 US Torcy<br/>\r\n1999-06 Roissy-en-Brie",
				      "enetpulseId": "248453",
				      "firstname": "Paul",
				      "height": "191",
				      "id": "255800",
				      "images": {
				        "@uri": "http://api.tv2.no/sport/resources/people/255800/images/"
				      },
				      "lastname": "Pogba",
				      "memberships": {
				        "@uri": "http://api.tv2.no/sport/resources/people/255800/memberships/"
				      },
				      "nickname": "Paul Labile Pogba",
				      "nifsId": "77458",
				      "role": {
				        "@uri": "http://api.tv2.no/sport/resources/roles/3/"
				      },
				      "weight": "84"
				    },
				    "progId": "1222223",
				    "realTime": "2017-08-13T18:46:21+02:00",
				    "person2": {
				      "@uri": "http://api.tv2.no/sport/resources/people/79563/"
				    },
				    "team": {
				      "@uri": "http://api.tv2.no/sport/resources/teams/735/"
				    },
				    "text": "Har du sett, her renner det inn! En perfekt kamp for Manchester United krones av en herlig scoring fra franskmannen, som kombinerer med sin landsmann Martial. Avslutningen fra 20 meter er det nok fart i, og da må Joe Hart plukke sin fjerde ball ut av nettet i debuten.",
				    "text2": "Baklengsmål West Ham Hart\r\nScoring Man. United Overgang Direkte i mål\r\nScoring3",
				    "videoDistributed": "1",
				    "videoMobilProfileId": "2"
				  },
				  {
				    "@uri": "http://api.tv2.no/sport/resources/events/14316421/",
				    "eventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/eventtypes/31/"
				    },
				    "eventtime": "90",
				    "extendedeventtype": {
				      "@uri": "http://api.tv2.no/sport/resources/extendedeventtypes/304/"
				    },
				    "goalsTeamA": "4",
				    "goalsTeamB": "0",
				    "groupId": "1502642910000",
				    "id": "14316421",
				    "match": {
				      "@uri": "http://api.tv2.no/sport/resources/matches/873944/"
				    },
				    "person1": {
				      "@uri": "http://api.tv2.no/sport/resources/people/255800/"
				    },
				    "realTime": "2017-08-13T18:46:21+02:00",
				    "team": {
				      "@uri": "http://api.tv2.no/sport/resources/teams/735/"
				    }
				  }
		]

		const elem = instatiateShallowWithOptions(matchInfo, shallowOptions);
		const calcEvents = elem.instance().calculateHomeAndAwayEvents(events);
		expect(calcEvents.home.length).toEqual(4);
		expect(calcEvents.away.length).toEqual(0);
	})

	it('filters goal events correctly', () => {
		const events = [
			{
				eventtype: {
					'@uri': "http://api.tv2.no/sport/resources/eventtypes/3/"
				},
				extendedeventtype: {
					'@uri': "http://api.tv2.no/sport/resources/extendedeventtypes/304/"
				}
			},
			{
				eventtype: {
					'@uri': "http://api.tv2.no/sport/resources/eventtypes/3/"
				},
				extendedeventtype: {
					'@uri': "http://api.tv2.no/sport/resources/extendedeventtypes/105/"
				}
			},
			{
				eventtype: {
					'@uri': "http://api.tv2.no/sport/resources/eventtypes/3/"
				},
				extendedeventtype: {
					'@uri': "http://api.tv2.no/sport/resources/extendedeventtypes/304/"
				}
			},
			{
				eventtype: {
					'@uri': "http://api.tv2.no/sport/resources/eventtypes/3/"
				},
				extendedeventtype: {
					'@uri': "http://api.tv2.no/sport/resources/extendedeventtypes/106/"
				}
			},
			{
				eventtype: {
					'@url': ""
				},
				extendedeventtype: {
					'uri': "ypes/304/"
				}
			}
		]

		const elem = instatiateShallowWithOptions(matchInfo, shallowOptions);
		const filteredEvents = elem.instance().filterGoalEvents(events);

	})
})